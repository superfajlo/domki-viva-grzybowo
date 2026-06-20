"use client";

import {
  CONTACT_FORM_SUCCESS_MESSAGE,
  getValidationErrorMessage,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact-email";
import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  dates: string;
  guests: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  dates: "",
  guests: "",
  message: "",
};

export function ContactForm({ fillHeight = false }: { fillHeight?: boolean }) {
  const [form, setForm] = useState<FormState>(initial);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const loadedAt = useRef<number>(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  function validateClient(): string | null {
    const payload: ContactPayload = {
      ...form,
      website: honeypot,
      loadedAt: loadedAt.current,
    };
    const code = validateContactPayload(payload);
    if (!code || code === "spam" || code === "too_fast") return null;
    return getValidationErrorMessage(code);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const clientError = validateClient();
    if (clientError) {
      setStatus("error");
      setErrorMessage(clientError);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: honeypot,
          loadedAt: loadedAt.current,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Wystąpił błąd. Spróbuj ponownie.");
        return;
      }

      setStatus("success");
      setForm(initial);
      setHoneypot("");
      loadedAt.current = Date.now();
    } catch {
      setStatus("error");
      setErrorMessage("Brak połączenia z serwerem. Zadzwoń pod 507 130 571.");
    }
  }

  const inputClass =
    "w-full min-h-11 rounded-xl border border-sand-dark bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/25 disabled:opacity-60 sm:text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative space-y-4 ${fillHeight ? "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:gap-4 lg:space-y-0" : ""}`}
      noValidate
    >
      {/* Honeypot – ukryte przed botami */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Nie wypełniaj tego pola
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Imię i nazwisko</span>
        <input
          type="text"
          name="name"
          required
          minLength={1}
          maxLength={120}
          autoComplete="name"
          className={inputClass}
          disabled={status === "loading"}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Adres e-mail</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={inputClass}
          disabled={status === "loading"}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Numer telefonu</span>
        <input
          type="tel"
          name="phone"
          required
          minLength={1}
          maxLength={30}
          autoComplete="tel"
          className={inputClass}
          disabled={status === "loading"}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </label>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">
            Termin pobytu <span className="font-normal text-ink-muted">(opcjonalnie)</span>
          </span>
          <input
            type="text"
            name="dates"
            maxLength={100}
            placeholder="np. 10–17 lipca 2026"
            className={inputClass}
            disabled={status === "loading"}
            value={form.dates}
            onChange={(e) => setForm({ ...form, dates: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">
            Liczba osób <span className="font-normal text-ink-muted">(opcjonalnie)</span>
          </span>
          <input
            type="number"
            name="guests"
            min={1}
            max={20}
            placeholder="np. 4"
            className={inputClass}
            disabled={status === "loading"}
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
          />
        </label>
      </div>

      <label className={fillHeight ? "block lg:flex lg:min-h-0 lg:flex-1 lg:flex-col" : "block"}>
        <span className="mb-1 block text-sm font-medium text-ink">Treść wiadomości</span>
        <textarea
          name="message"
          required
          minLength={1}
          maxLength={5000}
          rows={5}
          className={`${inputClass} ${fillHeight ? "lg:min-h-[8rem] lg:flex-1 lg:resize-none" : ""}`}
          disabled={status === "loading"}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className={`btn-cta w-full sm:w-auto sm:px-10 ${fillHeight ? "shrink-0" : ""}`}
      >
        {status === "loading" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>

      {status === "success" && (
        <p
          className="rounded-xl border border-secondary/30 bg-primary/10 px-4 py-3 text-sm text-ink"
          role="status"
          aria-live="polite"
        >
          {CONTACT_FORM_SUCCESS_MESSAGE}
        </p>
      )}

      {status === "error" && errorMessage && (
        <p
          className="rounded-xl border border-secondary/40 bg-background px-4 py-3 text-sm text-ink"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
