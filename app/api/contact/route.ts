import { CONTACT } from "@/lib/site";
import {
  formatClientReplyTo,
  formatContactEmail,
  getContactToEmail,
  getValidationErrorMessage,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact-email";
import { createMailTransporter, getSmtpConfig } from "@/lib/smtp";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe dane formularza. Odśwież stronę i spróbuj ponownie." },
      { status: 400 },
    );
  }

  const validationError = validateContactPayload(body);
  if (validationError === "spam" || validationError === "too_fast") {
    return NextResponse.json({ ok: true });
  }
  if (validationError) {
    return NextResponse.json(
      { error: getValidationErrorMessage(validationError), code: validationError },
      { status: 400 },
    );
  }

  const ownerEmail = getContactToEmail();
  const { configured, user: smtpUser } = getSmtpConfig();

  if (!configured || !smtpUser) {
    console.error("Contact form: ustaw SMTP_USER i SMTP_PASS (konto techniczne, nie e-mail klienta)");
    return NextResponse.json(
      {
        error: `Wysyłka wiadomości jest tymczasowo niedostępna. Zadzwoń pod ${CONTACT.phone} lub napisz na ${ownerEmail}.`,
      },
      { status: 503 },
    );
  }

  const transporter = createMailTransporter();
  const text = formatContactEmail(body);
  const replyTo = formatClientReplyTo(body);

  try {
    await transporter.sendMail({
      from: `"Formularz Domki Viva" <${smtpUser}>`,
      to: ownerEmail,
      replyTo,
      subject: `Zapytanie z formularza – ${body.name.trim()}`,
      text,
    });
  } catch (err) {
    console.error("Contact form send error:", err);
    return NextResponse.json(
      {
        error: `Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń: ${CONTACT.phone}.`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
