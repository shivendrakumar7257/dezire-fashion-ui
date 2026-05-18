import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero1 from "@/assets/hero-1.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Dezire Fashion" },
      { name: "description", content: "Sign in or create your Dezire Fashion account." },
    ],
  }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <section className="grid min-h-[calc(100vh-160px)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={hero1} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-cream">
          <Link to="/" className="font-display text-xl tracking-[0.2em]">
            DEZIRE<span className="text-gold">.</span>FASHION
          </Link>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Members</p>
            <h2 className="mt-4 font-display text-5xl leading-tight max-w-md">
              The private list. Early drops, archive access and members-only offers.
            </h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16 lg:px-16">
        <div className="w-full max-w-md">
          <div className="flex gap-1 border-b border-border">
            {(["in", "up"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={[
                  "flex-1 py-3 text-[11px] uppercase tracking-[0.3em] transition",
                  mode === m ? "border-b-2 border-gold text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {m === "in" ? "Sign In" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mt-10 space-y-6">
            {mode === "up" && <Field label="Full name" />}
            <Field label="Email" type="email" />
            <Field label="Password" type="password" />

            {mode === "in" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="accent-gold" /> Remember me
                </label>
                <a href="#" className="text-muted-foreground hover:text-foreground gold-underline">Forgot?</a>
              </div>
            )}

            <button className="w-full bg-ink py-4 text-[11px] uppercase tracking-[0.3em] text-cream transition hover:bg-charcoal">
              {mode === "in" ? "Sign in" : "Create account"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="bg-background px-3">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="border border-border py-3 text-xs uppercase tracking-[0.25em] hover:border-gold">
                Google
              </button>
              <button type="button" className="border border-border py-3 text-xs uppercase tracking-[0.25em] hover:border-gold">
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input type={type} className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold" />
    </div>
  );
}
