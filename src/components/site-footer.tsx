import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="font-display text-2xl tracking-[0.2em] text-cream">
              DEZIRE<span className="text-gold">.</span>FASHION
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
              Quietly luxurious essentials and elevated streetwear, designed in
              Mumbai for the modern generation.
            </p>
            <div className="mt-8 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 transition hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={[
            ["New Arrivals", "/products"],
            ["Women", "/products"],
            ["Men", "/products"],
            ["Streetwear", "/products"],
            ["Ethnic", "/products"],
          ]} />
          <FooterCol title="Company" links={[
            ["About", "/about"],
            ["Journal", "/blog"],
            ["Contact", "/contact"],
            ["Careers", "/about"],
            ["Press", "/about"],
          ]} />
          <FooterCol title="Help" links={[
            ["Shipping", "/contact"],
            ["Returns", "/contact"],
            ["Size Guide", "/contact"],
            ["Track Order", "/contact"],
            ["FAQ", "/contact"],
          ]} />
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs tracking-[0.2em] uppercase text-cream/50">
            © 2026 Dezire Fashion. Crafted in India.
          </p>
          <div className="flex items-center gap-3 text-cream/60">
            {["VISA", "MC", "AMEX", "UPI", "PAYTM", "RAZORPAY"].map((p) => (
              <span key={p} className="rounded border border-cream/15 px-2.5 py-1 text-[10px] tracking-[0.2em]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="lg:col-span-2">
      <h4 className="font-display text-lg mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-cream/70 transition hover:text-gold">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
