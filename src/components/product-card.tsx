import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group relative">
      <Link to="/products" className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            width={800}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
          <img
            src={p.hover}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
          />

          {p.badge && (
            <span className="absolute left-3 top-3 bg-ink/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cream">
              {p.badge}
            </span>
          )}

          <button
            aria-label="Wishlist"
            onClick={(e) => e.preventDefault()}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </button>

          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => e.preventDefault()}
              className="flex w-full items-center justify-center gap-2 bg-ink py-3 text-[11px] uppercase tracking-[0.3em] text-cream transition hover:bg-charcoal"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Bag
            </button>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{p.category}</p>
          <h3 className="mt-1 text-sm font-medium">{p.name}</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-xs text-muted-foreground">
              {p.rating} <span className="opacity-60">({p.reviews})</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">₹{p.price.toLocaleString("en-IN")}</p>
          {p.oldPrice && (
            <p className="text-xs text-muted-foreground line-through">
              ₹{p.oldPrice.toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
