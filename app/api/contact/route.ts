import { CONTACT } from "@/lib/site";
import { getClientIp, isRateLimited } from "@/lib/contact-rate-limit";
import {
  CONTACT_MAIL_VERSION,
  getContactMailMeta,
  getContactToEmail,
  getValidationErrorMessage,
  sendContactMail,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact-email";
import { createMailTransporter, getSmtpConfig } from "@/lib/smtp";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

/** Diagnostyka tylko poza produkcją – otwórz /api/contact lokalnie. */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return noStoreJson({ error: "Not found" }, 404);
  }

  const { configured } = getSmtpConfig();
  return noStoreJson({
    ...getContactMailMeta(),
    smtpConfigured: configured,
  });
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        error: `Zbyt wiele wiadomości z tego adresu. Spróbuj później lub zadzwoń: ${CONTACT.phone}.`,
      },
      { status: 429 },
    );
  }

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

  try {
    await sendContactMail(transporter, {
      smtpUser,
      ownerEmail,
      body,
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

  return noStoreJson({ ok: true, mailVersion: CONTACT_MAIL_VERSION });
}
