import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dezire Fashion" },
      { name: "description", content: "Talk to the Dezire team. Visit our flagship in Mumbai or send us a note." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-20">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl lg:text-7xl leading-[1.02]">
            We'd love<br />to hear from you.
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Questions about a piece, a fit, an order or a press request — our
            team responds within one business day.
          </p>

          <div className="mt-12 space-y-6">
            <Info Icon={Mail} label="Email" value="hello@dezirefashion.com" />
            <Info Icon={Phone} label="Phone" value="+91 98765 43210" />
            <Info Icon={MapPin} label="Flagship" value="Kala Ghoda, Mumbai 400001" />
            <Info Icon={Instagram} label="Instagram" value="@dezirefashion" />
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-3xl border border-border bg-card p-8 shadow-soft lg:p-12"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" />
            <Field label="Last name" />
          </div>
          <Field label="Email" type="email" className="mt-5" />
          <Field label="Subject" className="mt-5" />
          <div className="mt-5">
            <label className="block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Message</label>
            <textarea
              rows={5}
              className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <button className="mt-10 w-full bg-ink py-4 text-[11px] uppercase tracking-[0.3em] text-cream transition hover:bg-charcoal">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

function Info({ Icon, label, value }: { Icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-base">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, type = "text", className = "" }: { label: string; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input
        type={type}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
