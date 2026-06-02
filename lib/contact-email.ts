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

/** Treść maila do właściciela – wszystkie pola z formularza. */
export function formatContactEmail(body: ContactPayload) {
  const name = body.name.trim();
  const email = body.email.trim();
  const phone = body.phone.trim();
  const dates = body.dates?.trim() || NOT_PROVIDED;
  const guests = body.guests?.trim() || NOT_PROVIDED;

  return [
    "Nowe zapytanie z formularza kontaktowego – Domki Viva",
    "",
    `Imię i nazwisko: ${name}`,
    `Telefon: ${phone}`,
    `E-mail: ${email}`,
    `Termin pobytu: ${dates}`,
    `Liczba osób: ${guests}`,
    "",
    "Treść wiadomości:",
    body.message.trim(),
  ].join("\n");
}

/** Reply-To: dane klienta – właściciel może odpowiedzieć jednym kliknięciem. */
export function formatClientReplyTo(body: ContactPayload): string {
  const name = body.name.trim().replace(/"/g, "'");
  const email = body.email.trim();
  return `"${name}" <${email}>`;
}
