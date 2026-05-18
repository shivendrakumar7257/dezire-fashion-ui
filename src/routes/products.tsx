import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop All — Dezire Fashion" },
      { name: "description", content: "Shop the latest curated drop. Premium menswear, womenswear, streetwear and ethnic pieces." },
    ],
  }),
  component: Products,
});

const cats = ["All", "Women", "Men", "Streetwear", "Ethnic", "Casual"];

function Products() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-20">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Shop</p>
        <h1 className="font-display text-5xl lg:text-7xl">The Collection</h1>
        <p className="max-w-xl text-muted-foreground">
          {list.length} pieces · curated for the season. Quiet silhouettes in
          honest materials.
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-y border-border py-4">
        <div className="flex gap-1 overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={[
                "px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition",
                cat === c ? "bg-ink text-cream" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>
        <button className="hidden lg:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
          <SlidersHorizontal className="h-4 w-4" /> Filter & Sort
        </button>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
