import { createFileRoute } from "@tanstack/react-router";
import hero3 from "@/assets/hero-3.png";
import campaign from "@/assets/campaign.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dezire Fashion" },
      { name: "description", content: "Designed in Mumbai. Made for the modern generation. The story behind Dezire Fashion." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative -mt-[88px] h-[70vh] min-h-[500px] overflow-hidden lg:-mt-[112px]">
        <img src={hero3} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-end px-5 pb-16 lg:px-10 lg:pb-24">
          <div className="text-cream max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Our Story</p>
            <h1 className="mt-6 font-display text-6xl lg:text-8xl leading-[0.95]">Designed for the modern generation.</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Est. 2026</p>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl leading-tight">
              A quiet kind of luxury, from Mumbai to your wardrobe.
            </h2>
          </div>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              Dezire Fashion was founded on the belief that great clothes
              shouldn't shout. We design considered pieces — in cream, charcoal,
              soft beige and the occasional flash of gold — that move from
              morning to evening with you.
            </p>
            <p>
              Every collection is patterned in our Mumbai studio, sampled in
              small lots, and produced with mills that share our standards.
              Heavyweight cottons, brushed wools, raw silks. Nothing fast.
            </p>
            <p>
              We design for a generation that values restraint over noise, and
              quality over quantity. We hope you find a forever piece here.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-beige/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-4">
            {[
              ["50K+", "Members worldwide"],
              ["120+", "Curated pieces a year"],
              ["18", "Production partners"],
              ["4.9", "Average rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-6xl text-gold">{n}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.25em] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative my-24 h-[480px] overflow-hidden lg:h-[620px]">
        <img src={campaign} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-end px-5 pb-16 lg:px-10 lg:pb-24 text-cream">
          <p className="max-w-2xl font-display text-3xl leading-snug lg:text-5xl">
            "Style is a quiet authority. It does not need to be announced."
          </p>
        </div>
      </section>
    </>
  );
}
