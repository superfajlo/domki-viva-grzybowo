import nodemailer from "nodemailer";

const ONET_SMTP_HOST = "smtp.poczta.onet.pl";
const ONET_SMTP_PORT = 587;

/**
 * Konto techniczne SMTP – wyłącznie do wysyłki z serwera.
 * Nigdy nie używaj adresu e-mail klienta z formularza jako SMTP_USER.
 */
export function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim() || ONET_SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? String(ONET_SMTP_PORT));
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  return {
    host,
    port,
    user,
    pass,
    configured: Boolean(host && user && pass),
  };
}

/** Transport SMTP – port 587, STARTTLS. */
export function createMailTransporter() {
  const { host, port, user, pass } = getSmtpConfig();

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}
