import type { Transporter } from "nodemailer";
import { CONTACT } from "./site";

export const CONTACT_FORM_SUCCESS_MESSAGE =
  "Dziękujemy za wiadomość. Skontaktujemy się z Państwem najszybciej jak to możliwe.";

/** Adres właściciela – odbiorca wiadomości z formularza (CONTACT_TO_EMAIL). */
export function getContactToEmail(): string {
  const fromEnv = process.env.CONTACT_TO_EMAIL?.trim();
  return fromEnv || CONTACT.email;
}

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  dates?: string;
  guests?: string;
  message: string;
  website?: string;
  loadedAt?: number;
};

export type ContactValidationCode =
  | "spam"
  | "too_fast"
  | "invalid_name"
  | "invalid_email"
  | "invalid_phone"
  | "invalid_message"
  | "invalid_dates"
  | "invalid_guests";

const VALIDATION_MESSAGES: Record<Exclude<ContactValidationCode, "spam" | "too_fast">, string> = {
  invalid_name: "Podaj imię i nazwisko (maks. 120 znaków).",
  invalid_email: "Podaj prawidłowy adres e-mail.",
  invalid_phone: "Podaj numer telefonu (maks. 30 znaków).",
  invalid_message: "Wpisz treść wiadomości (maks. 5000 znaków).",
  invalid_dates: "Termin pobytu jest zbyt długi (maks. 100 znaków).",
  invalid_guests: "Liczba osób musi być od 1 do 20.",
};

export function getValidationErrorMessage(code: ContactValidationCode): string {
  if (code === "spam" || code === "too_fast") return "";
  return VALIDATION_MESSAGES[code];
}

export function validateContactPayload(body: ContactPayload): ContactValidationCode | null {
  if (body.website?.trim()) return "spam";
  if (body.loadedAt && Date.now() - body.loadedAt < 3000) return "too_fast";

  if (!body.name?.trim() || body.name.length > 120) return "invalid_name";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()))
    return "invalid_email";
  if (!body.phone?.trim() || body.phone.length > 30) return "invalid_phone";
  if (!body.message?.trim() || body.message.length > 5000) return "invalid_message";
  if (body.dates && body.dates.length > 100) return "invalid_dates";
  if (
    body.guests?.trim() &&
    (Number.isNaN(Number(body.guests)) ||
      Number(body.guests) < 1 ||
      Number(body.guests) > 20)
  ) {
    return "invalid_guests";
  }

  return null;
}

const NOT_PROVIDED = "nie podano";

/** Nazwa nadawcy w skrzynce odbiorczej (From). */
export const CONTACT_MAIL_FROM_NAME = "Domki VIVA";

/** Temat wiadomości z formularza. */
export const CONTACT_MAIL_SUBJECT = "noclegi zapytanie";

/** Wersja szablonu – do diagnostyki (GET /api/contact). */
export const CONTACT_MAIL_VERSION = 2;

export function getContactMailMeta() {
  return {
    version: CONTACT_MAIL_VERSION,
    fromName: CONTACT_MAIL_FROM_NAME,
    subject: CONTACT_MAIL_SUBJECT,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getContactFields(body: ContactPayload) {
  const name = body.name.trim();
  const email = body.email.trim();
  const phone = body.phone.trim();
  const dates = body.dates?.trim() || NOT_PROVIDED;
  const guests = body.guests?.trim() || NOT_PROVIDED;
  const message = body.message.trim();

  return { name, email, phone, dates, guests, message };
}

/** Treść maila (plain text) – czytelna wersja zapasowa. */
export function formatContactEmail(body: ContactPayload) {
  const { name, email, phone, dates, guests, message } = getContactFields(body);

  return [
    "DOMKI VIVA – nowe zapytanie z formularza",
    "────────────────────────────────────",
    "",
    "DANE KONTAKTOWE",
    `  Imię i nazwisko:  ${name}`,
    `  Telefon:         ${phone}`,
    `  E-mail:          ${email}`,
    "",
    "POBYT",
    `  Termin:          ${dates}`,
    `  Liczba osób:     ${guests}`,
    "",
    "WIADOMOŚĆ",
    "────────────────────────────────────",
    message,
    "",
    "Odpowiedz używając „Odpowiedz” – trafi do klienta.",
  ].join("\n");
}

/** Treść maila (HTML) – układ dopasowany do kolorystyki strony. */
export function formatContactEmailHtml(body: ContactPayload): string {
  const { name, email, phone, dates, guests, message } = getContactFields(body);
  const messageHtml = escapeHtml(message).replace(/\n/g, "<br>");

  const row = (label: string, value: string, valueIsLink = false) => {
    const safe = escapeHtml(value);
    const cell = valueIsLink
      ? `<a href="mailto:${safe}" style="color:#c98900;text-decoration:none;font-weight:600;">${safe}</a>`
      : `<span style="color:#2b2b2b;font-weight:600;">${safe}</span>`;
    return `
      <tr>
        <td style="padding:10px 16px 10px 0;color:#666666;font-size:13px;vertical-align:top;width:130px;white-space:nowrap;">${label}</td>
        <td style="padding:10px 0;font-size:15px;line-height:1.4;">${cell}</td>
      </tr>`;
  };

  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background-color:#fff9e8;font-family:Segoe UI,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff9e8;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8ddb5;box-shadow:0 4px 24px rgba(43,43,43,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#f7c600 0%,#ffb800 100%);padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:700;letter-spacing:0.04em;color:#2b2b2b;">DOMKI VIVA</p>
              <p style="margin:8px 0 0;font-size:14px;color:#5c4a20;">Nowe zapytanie z formularza kontaktowego</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c98900;">Dane kontaktowe</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row("Imię i nazwisko", name)}
                ${row("Telefon", phone)}
                ${row("E-mail", email, true)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c98900;">Pobyt</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row("Termin", dates)}
                ${row("Liczba osób", guests)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c98900;">Wiadomość</p>
              <div style="background:#fff3d6;border:1px solid #e8ddb5;border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.55;color:#2b2b2b;">${messageHtml}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;background:#fff9e8;border-top:1px solid #e8ddb5;text-align:center;">
              <p style="margin:0;font-size:12px;color:#666666;line-height:1.5;">Odpowiedz na ten e-mail – wiadomość trafi bezpośrednio do klienta.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Reply-To: dane klienta – właściciel może odpowiedzieć jednym kliknięciem. */
export function formatClientReplyTo(body: ContactPayload): string {
  const name = body.name.trim().replace(/"/g, "'");
  const email = body.email.trim();
  return `"${name}" <${email}>`;
}

/** Wysyłka maila – HTML jako główna treść (Onet / Outlook lepiej ją renderują). */
export async function sendContactMail(
  transporter: Transporter,
  options: { smtpUser: string; ownerEmail: string; body: ContactPayload },
) {
  const { smtpUser, ownerEmail, body } = options;
  const text = formatContactEmail(body);
  const html = formatContactEmailHtml(body);

  return transporter.sendMail({
    from: {
      name: CONTACT_MAIL_FROM_NAME,
      address: smtpUser,
    },
    to: ownerEmail,
    replyTo: formatClientReplyTo(body),
    subject: CONTACT_MAIL_SUBJECT,
    text,
    html,
    headers: {
      "X-Domki-Viva-Mail": `contact-v${CONTACT_MAIL_VERSION}`,
    },
  });
}
