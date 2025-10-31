import React, { useState } from "react";

export type ContactCopy = {
  title: string;
  subtitle: string;
  form: {
    email: { label: string; placeholder: string; required: string; invalid: string };
    subject: { label: string; placeholder: string; required: string };
    message: { label: string; placeholder: string; required: string };
    submit: string;
    successHint: string;
    srErrorPrefix: string;
  };
  links: {
    linkedin: string;
    github: string;
    instagram: string;
  };
};

const EMAIL = "pandresmatute@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function ContactSection({ copy }: { copy: ContactCopy }) {
  const [form, setForm] = useState<FormState>({ email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState(false);

  const setField = (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.email.trim()) next.email = copy.form.email.required;
    else if (!EMAIL_REGEX.test(form.email.trim())) next.email = copy.form.email.invalid;

    if (!form.subject.trim()) next.subject = copy.form.subject.required;
    if (!form.message.trim()) next.message = copy.form.message.required;
    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const subject = encodeURIComponent(form.subject.trim());
    const bodyLines = [form.message.trim(), "", "--------------------", `Sender: ${form.email.trim()}`];
    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section
      id="contacto"
      className="relative isolate min-h-[70vh] w-full flex items-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 text-white"
      aria-label={copy.title}
    >
      <div className="relative z-40 w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white/10 p-6 sm:p-8 md:p-10 ring-1 ring-white/15 backdrop-blur-lg shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{copy.title}</h2>
        <p className="mt-3 text-sm sm:text-base text-white/80">{copy.subtitle}</p>

        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <Field
              id="contact-email"
              label={copy.form.email.label}
              placeholder={copy.form.email.placeholder}
              value={form.email}
              error={errors.email}
              onChange={setField("email")}
              prefix={copy.form.srErrorPrefix}
              type="email"
            />
            <Field
              id="contact-subject"
              label={copy.form.subject.label}
              placeholder={copy.form.subject.placeholder}
              value={form.subject}
              error={errors.subject}
              onChange={setField("subject")}
              prefix={copy.form.srErrorPrefix}
              type="text"
            />
          </div>

          <FieldTextArea
            id="contact-message"
            label={copy.form.message.label}
            placeholder={copy.form.message.placeholder}
            value={form.message}
            error={errors.message}
            onChange={setField("message")}
            prefix={copy.form.srErrorPrefix}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30 focus-visible:ring-offset-black/40"
              style={{
                background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)',
                boxShadow: '0 4px 15px rgba(22, 33, 62, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0a0a0a 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0a0a0a 100%)';
              }}
            >
              {copy.form.submit}
            </button>
            <p className="text-xs sm:text-sm text-white/65">{copy.form.successHint}</p>
          </div>
        </form>

        <div className="mt-6 sm:mt-8 space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-sm font-medium text-white/80">
              Email
            </label>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/85 ring-1 ring-white/20 bg-white/8 hover:bg-white/14 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30 focus-visible:ring-offset-black/40 gap-2 w-full sm:w-auto"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {EMAIL}
              <svg className={`h-4 w-4 transition-all ${copied ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {copied && <span className="text-green-300 text-xs">Copiado!</span>}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <SocialLink href="https://linkedin.com/in/pablo-andres-matute" label={copy.links.linkedin}>
            {copy.links.linkedin}
          </SocialLink>
          <SocialLink href="https://github.com/MatuCode" label={copy.links.github}>
            {copy.links.github}
          </SocialLink>
          <SocialLink href="https://instagram.com/matute.api.dev" label={copy.links.instagram}>
            {copy.links.instagram}
          </SocialLink>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] bg-black/30"
        
      />
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prefix: string;
  type: "text" | "email";
};

function Field({ id, label, placeholder, value, error, onChange, prefix, type }: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <label htmlFor={id} className="text-xs sm:text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`w-full rounded-lg sm:rounded-xl bg-white/8 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${
          error ? "ring-red-400/70" : "ring-white/15 hover:ring-white/25"
        }`}
      />
      {error && (
        <p id={describedBy} role="alert" className="text-xs font-medium text-red-300">
          <span className="sr-only">{prefix}: </span>
          {error}
        </p>
      )}
    </div>
  );
}

type FieldTextAreaProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  prefix: string;
};

function FieldTextArea({ id, label, placeholder, value, error, onChange, prefix }: FieldTextAreaProps) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <label htmlFor={id} className="text-xs sm:text-sm font-medium text-white/80">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={5}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`w-full resize-none rounded-lg sm:rounded-xl bg-white/8 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${
          error ? "ring-red-400/70" : "ring-white/15 hover:ring-white/25"
        }`}
      />
      {error && (
        <p id={describedBy} role="alert" className="text-xs font-medium text-red-300">
          <span className="sr-only">{prefix}: </span>
          {error}
        </p>
      )}
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/85 ring-1 ring-white/20 bg-white/8 hover:bg-white/14 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30 focus-visible:ring-offset-black/40"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}


