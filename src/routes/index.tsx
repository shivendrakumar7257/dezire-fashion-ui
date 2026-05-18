import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Gift, Sparkles, Mail, Quote } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import campaign from "@/assets/campaign.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catStreet from "@/assets/cat-street.jpg";
import catEthnic from "@/assets/cat-ethnic.jpg";
import catCasual from "@/assets/cat-casual.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dezire Fashion — Elevate Your Style" },
      { name: "description", content: "Premium fashion collection for the modern generation. Shop curated menswear, womenswear, streetwear, and ethnic pieces." },
    ],
  }),
  component: Home,
});

const slides = [
  { image: hero1, eyebrow: "Autumn / Winter '26", title: "Elevate Your Style", subtitle: "Quietly luxurious essentials, made for the modern generation." },
  { image: hero3, eyebrow: "The Tailored Edit", title: "Modern Heirlooms", subtitle: "Considered silhouettes in cream, charcoal and soft beige." },
  { image: hero2, eyebrow: "Street Capsule", title: "Off-Duty, Refined", subtitle: "Heavyweight cottons and oversized cuts for the city." },
  { image: hero4, eyebrow: "Heritage Reimagined", title: "Quiet Opulence", subtitle: "Indo-modern silhouettes with hand-finished detail." },
];

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Trending />
      <CampaignBanner />
      <BestSellers />
      <Reviews />
      <BlogPreview />
      <Newsletter />
    </>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative -mt-[88px] h-[100svh] min-h-[640px] w-full overflow-hidden lg:-mt-[112px]">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt=""
            className="h-full w-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "auto"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/80" />
        </div>
      ))}

      {/* Sale ribbon (rotating) */}
      <div className="absolute right-6 top-28 z-10 hidden lg:block">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="h-full w-full fill-gold text-ink">
              <defs>
                <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="text-[11px] uppercase tracking-[0.3em] font-medium" fill="currentColor">
                <textPath href="#circ">MEGA SALE · LIVE · MEGA SALE · LIVE · </textPath>
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-gold" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-full max-w-[1400px] mx-auto px-5 lg:px-10 items-end pb-20 lg:items-center lg:pb-0">
        <div className="text-cream max-w-2xl animate-fade-up">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
            {slides[i].eyebrow}
          </p>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] sm:text-7xl lg:text-[110px] text-balance">
            {slides[i].title}
          </h1>
          <p className="mt-6 max-w-md text-base text-cream/80 lg:text-lg">
            {slides[i].subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 bg-cream px-7 py-4 text-[11px] uppercase tracking-[0.3em] text-ink transition hover:bg-gold"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 border border-cream/40 px-7 py-4 text-[11px] uppercase tracking-[0.3em] text-cream backdrop-blur transition hover:border-gold hover:text-gold"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Floating discount cards */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:flex gap-4">
        {[
          { t: "Buy 1", v: "15% OFF" },
          { t: "Buy 2", v: "25% OFF" },
          { t: "Buy 3", v: "35% OFF" },
        ].map((c, idx) => (
          <div
            key={c.t}
            className="glass-dark animate-float rounded-2xl px-6 py-4 text-cream"
            style={{ animationDelay: `${idx * 0.4}s` }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream/70">{c.t}</p>
            <p className="font-display text-2xl text-gold">{c.v}</p>
          </div>
        ))}
      </div>

      {/* Gift badge */}
      <div className="absolute left-6 top-28 z-10 hidden lg:block">
        <div className="glass-dark flex items-center gap-3 rounded-full px-5 py-3 text-cream">
          <Gift className="h-4 w-4 text-gold" />
          <p className="text-[11px] uppercase tracking-[0.25em]">Free Gift · Orders ₹2999+</p>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 right-6 z-10 flex gap-2 lg:bottom-10 lg:right-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={[
              "h-[2px] transition-all",
              i === idx ? "w-10 bg-gold" : "w-5 bg-cream/40",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

const cats = [
  { name: "Women", image: catWomen, span: "lg:row-span-2" },
  { name: "Men", image: catMen, span: "" },
  { name: "Streetwear", image: catStreet, span: "" },
  { name: "Ethnic", image: catEthnic, span: "" },
  { name: "Casual", image: catCasual, span: "" },
];

function Categories() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Curated</p>
          <h2 className="mt-3 font-display text-5xl lg:text-6xl">Shop by Category</h2>
        </div>
        <Link to="/products" className="hidden lg:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground gold-underline">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
        {cats.map((c, idx) => (
          <Link
            key={c.name}
            to="/products"
            className={[
              "group relative overflow-hidden bg-muted",
              c.span,
              idx === 0 ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/5] lg:aspect-auto" : "aspect-[3/4]",
            ].join(" ")}
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="flex items-end justify-between w-full text-cream">
                <h3 className="font-display text-3xl lg:text-4xl">{c.name}</h3>
                <ArrowUpRight className="h-6 w-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Trending() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Trending Now</p>
          <h2 className="mt-3 font-display text-5xl lg:text-6xl">The Edit</h2>
        </div>
        <Link to="/products" className="hidden lg:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground gold-underline">
          Shop all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

function CampaignBanner() {
  return (
    <section className="relative my-24 h-[520px] w-full overflow-hidden lg:h-[640px]">
      <img src={campaign} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 lg:px-10 text-cream">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Campaign 06</p>
        <h2 className="mt-6 font-display text-6xl lg:text-8xl max-w-3xl text-balance leading-[0.9]">
          The Atelier Collection
        </h2>
        <p className="mt-6 max-w-lg text-cream/80 lg:text-lg">
          Hand-finished tailoring in raw silk, brushed wool and washed linen.
          A study in restraint.
        </p>
        <div className="mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 border border-cream/40 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-cream transition hover:bg-cream hover:text-ink"
          >
            Discover Atelier <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  const list = [...products, ...products];
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Customer favourites</p>
            <h2 className="mt-3 font-display text-5xl lg:text-6xl">Best Sellers</h2>
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="flex gap-6 pl-5 pr-5 lg:pl-10 lg:pr-10" style={{ width: "max-content" }}>
          {list.map((p, idx) => (
            <div key={idx} className="w-[260px] shrink-0 lg:w-[300px]">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { name: "Ananya R.", city: "Mumbai", text: "The fabric quality and fit feel genuinely luxury. My new go-to brand.", rating: 5 },
  { name: "Rohan K.", city: "Bengaluru", text: "Considered design, beautifully packaged. The trench is a forever piece.", rating: 5 },
  { name: "Meher S.", city: "Delhi", text: "Effortless silhouettes that translate from office to dinner.", rating: 5 },
];

function Reviews() {
  return (
    <section className="bg-beige/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Loved by 50,000+</p>
          <h2 className="mt-3 font-display text-5xl lg:text-6xl">In Their Words</h2>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="glass rounded-2xl p-8 shadow-soft">
              <Quote className="h-7 w-7 text-gold" />
              <p className="mt-5 text-lg leading-relaxed text-foreground/90">
                "{r.text}"
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.city}</p>
                </div>
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const posts = [
  { image: blog1, tag: "Edit", title: "The Modern Heirloom Jewellery Story", date: "12 May 2026" },
  { image: blog2, tag: "Street Style", title: "Off-Duty Tailoring: How the Editors Wear It", date: "04 May 2026" },
  { image: blog3, tag: "Material", title: "A Study in Silk, Wool and Light", date: "21 Apr 2026" },
];

function BlogPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Journal</p>
          <h2 className="mt-3 font-display text-5xl lg:text-6xl">From the Studio</h2>
        </div>
        <Link to="/blog" className="hidden lg:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] gold-underline">
          Read all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
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

function Newsletter() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 lg:px-10 lg:pb-32">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-cream lg:px-20 lg:py-24">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Insider</p>
            <h2 className="mt-4 font-display text-4xl lg:text-6xl">Join the private list.</h2>
            <p className="mt-4 max-w-md text-cream/70">
              First access to new collections, archive pieces and members-only
              offers. ₹500 credit when you join.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/60" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full border border-cream/20 bg-transparent py-4 pl-11 pr-4 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
              />
            </div>
            <button className="bg-gold px-7 py-4 text-[11px] uppercase tracking-[0.3em] text-ink transition hover:bg-cream">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
