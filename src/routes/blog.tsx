import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import hero1 from "@/assets/hero-1.png";
import hero4 from "@/assets/hero-4.png";
import campaign from "@/assets/campaign.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Dezire Fashion" },
      { name: "description", content: "Stories, style edits and editorials from the Dezire studio." },
    ],
  }),
  component: Blog,
});

const featured = {
  image: campaign,
  tag: "Editorial",
  title: "The Atelier Diaries: Inside Our Mumbai Studio",
  excerpt: "A morning with the design team, from first sketch to final fit.",
  date: "18 May 2026",
};

const posts = [
  { image: blog1, tag: "Edit", title: "The Modern Heirloom Jewellery Story", date: "12 May 2026" },
  { image: blog2, tag: "Street Style", title: "Off-Duty Tailoring: How the Editors Wear It", date: "04 May 2026" },
  { image: blog3, tag: "Material", title: "A Study in Silk, Wool and Light", date: "21 Apr 2026" },
  { image: hero1, tag: "Profile", title: "Five Minutes with Our AW26 Muse", date: "12 Apr 2026" },
  { image: hero4, tag: "Heritage", title: "Reimagining the Drape: A Modern Sari", date: "30 Mar 2026" },
];

function Blog() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-20">
      <div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Journal</p>
        <h1 className="mt-3 font-display text-5xl lg:text-7xl">From the Studio</h1>
      </div>

      <Link to="/blog" className="group mt-16 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[5/4] overflow-hidden bg-muted">
          <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{featured.tag} · {featured.date}</p>
          <h2 className="mt-4 font-display text-4xl lg:text-6xl leading-[1.05]">{featured.title}</h2>
          <p className="mt-5 max-w-md text-muted-foreground">{featured.excerpt}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] gold-underline">
            Read story <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      <div className="mt-24 grid gap-8 lg:grid-cols-3">
        {posts.map((p) => (
          <Link to="/blog" key={p.title} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <span className="absolute left-4 top-4 bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ink">{p.tag}</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:rotate-45" />
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.date}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
