import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/hooks/use-store";

export function WishlistDrawer() {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
  } = useStore();

  const handleMoveToBag = (product: any) => {
    addToCart(product, "M"); // Add to cart with default size Medium
    toggleWishlist(product); // Remove from wishlist after moving
  };

  // Close on Escape press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWishlistOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!wishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in cursor-pointer"
        onClick={() => setWishlistOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 flex pl-10 max-w-full">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md transform bg-background text-foreground shadow-luxe border-l border-border transition-transform animate-slide-in flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div className="flex items-center gap-2.5">
              <Heart className="h-5 w-5 fill-gold text-gold" />
              <h2 className="font-display text-xl font-semibold tracking-wide uppercase">Your Wishlist</h2>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-cream">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={() => setWishlistOpen(false)}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
            {wishlist.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
                  <Heart className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium">Your Wishlist is empty</h3>
                  <p className="text-xs text-muted-foreground mt-2 max-w-xs">
                    Curate your favorite styles. Save pieces you love here to easily purchase them later.
                  </p>
                </div>
                <Link
                  to="/products"
                  onClick={() => setWishlistOpen(false)}
                  className="inline-flex items-center gap-2 bg-ink hover:bg-charcoal text-cream px-6 py-3 text-xs uppercase tracking-[0.25em] transition-all font-semibold rounded-full cursor-pointer"
                >
                  Browse Catalog <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-border">
                {wishlist.map((product) => (
                  <div key={product.id} className="flex gap-4 py-4 first:pt-0">
                    <div className="relative h-24 w-18 shrink-0 overflow-hidden bg-muted rounded-md border border-border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                          <p className="text-sm font-semibold shrink-0">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                          {product.category}
                        </p>
                        {product.oldPrice && (
                          <p className="text-xs text-muted-foreground line-through mt-0.5">
                            ₹{product.oldPrice.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Add to bag button */}
                        <button
                          onClick={() => handleMoveToBag(product)}
                          className="flex items-center justify-center gap-1.5 bg-ink hover:bg-charcoal text-cream text-[10px] uppercase tracking-[0.2em] font-semibold py-2 px-4 rounded-full transition-all cursor-pointer"
                        >
                          <ShoppingBag className="h-3.5 w-3.5 text-gold" />
                          Move to Bag
                        </button>
                        {/* Remove button */}
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-muted-foreground hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
