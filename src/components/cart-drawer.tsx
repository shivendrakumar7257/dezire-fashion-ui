import { useState, useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useStore } from "@/hooks/use-store";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "loading" | "success">("idle");
  const [orderNum, setOrderNum] = useState("");

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Multi-buy discount computation
  let discountPct = 0;
  let nextDiscountTier = "";
  if (totalItems === 1) {
    discountPct = 0.15;
    nextDiscountTier = "Add 1 more piece to unlock 25% OFF!";
  } else if (totalItems === 2) {
    discountPct = 0.25;
    nextDiscountTier = "Add 1 more piece to unlock 35% OFF!";
  } else if (totalItems >= 3) {
    discountPct = 0.35;
    nextDiscountTier = "Maximum 35% OFF discount unlocked! 🎉";
  }

  const discountVal = subtotal * discountPct;
  const total = subtotal - discountVal;

  const handleCheckout = () => {
    setCartOpen(false);
    navigate({ to: "/checkout" });
  };

  const closeAndReset = () => {
    setCartOpen(false);
    // Short timeout so step resets *after* slide drawer is fully closed
    setTimeout(() => setCheckoutStep("idle"), 300);
  };

  // Close on Escape press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndReset();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in cursor-pointer"
        onClick={closeAndReset}
      />

      <div className="absolute inset-y-0 right-0 flex pl-10 max-w-full">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md transform bg-background text-foreground shadow-luxe border-l border-border transition-transform animate-slide-in flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-gold" />
              <h2 className="font-display text-xl font-semibold tracking-wide uppercase">Shopping Bag</h2>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-cream">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeAndReset}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col justify-between">
            {checkoutStep === "success" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-semibold leading-tight">Order Placed</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                    Your luxury curated pieces are being prepared in our Mumbai studio.
                  </p>
                </div>
                <div className="bg-muted border border-border px-5 py-3 rounded-xl max-w-xs w-full">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Order Reference</p>
                  <p className="font-mono text-base font-bold text-foreground mt-1">{orderNum}</p>
                </div>
                <button
                  onClick={closeAndReset}
                  className="bg-ink text-cream hover:bg-charcoal px-8 py-3 text-xs uppercase tracking-[0.25em] transition-all font-medium rounded-full cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : checkoutStep === "loading" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="flex h-10 w-10 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold animate-pulse">
                  Processing luxury package...
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium">Your bag is empty</h3>
                  <p className="text-xs text-muted-foreground mt-2 max-w-xs">
                    Curate your signature style. Discover our premium linens, heavy-weight cottons, and box-fit silhouettes.
                  </p>
                </div>
                <Link
                  to="/products"
                  onClick={closeAndReset}
                  className="inline-flex items-center gap-2 bg-ink hover:bg-charcoal text-cream px-6 py-3 text-xs uppercase tracking-[0.25em] transition-all font-semibold rounded-full cursor-pointer"
                >
                  Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6 divide-y divide-border">
                {/* Cart Items List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4 first:pt-0">
                      <div className="relative h-24 w-18 shrink-0 overflow-hidden bg-muted rounded-md border border-border">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                            <p className="text-sm font-semibold shrink-0">
                              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                            {item.product.category}
                          </p>
                          <div className="inline-flex items-center gap-1.5 mt-2 bg-muted px-2.5 py-0.5 rounded-full text-[10px] font-bold text-foreground">
                            Size: <span className="text-gold uppercase font-mono">{item.size}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-border rounded-full bg-background overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="p-1 px-2.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="p-1 px-2.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
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
              </div>
            )}
          </div>

          {/* Footer Checkout Summary (Only if items exist and checkout is idle) */}
          {cart.length > 0 && checkoutStep === "idle" && (
            <div className="border-t border-border px-6 py-6 bg-[#F9F9F9] space-y-4">
              {/* Dynamic Multi-buy Reward Ribbon */}
              <div className="flex items-center gap-2.5 rounded-2xl bg-gold/10 border border-gold/25 p-3.5 text-ink animate-pulse">
                <Sparkles className="h-4 w-4 text-gold shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-ink">
                    Curated Discount: <span className="font-bold font-mono text-gold bg-ink rounded px-1.5 py-0.5 ml-1">{(discountPct * 100)}% OFF</span>
                  </p>
                  <p className="text-[10px] text-ink/75 mt-0.5 font-medium">{nextDiscountTier}</p>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Bag Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gold">
                  <span>Multi-Buy Discount ({(discountPct * 100)}%)</span>
                  <span className="font-mono">- ₹{discountVal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Standard Curated Shipping</span>
                  <span className="uppercase text-[10px] font-semibold text-emerald-600 tracking-wider">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-border/80 pt-3">
                  <span>Est. Order Total</span>
                  <span className="font-mono text-gold text-lg">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-2 bg-ink hover:bg-charcoal text-cream py-4 text-xs uppercase tracking-[0.3em] transition-all font-semibold rounded-full shadow-luxe cursor-pointer"
              >
                Checkout Securely <ArrowRight className="h-4 w-4 text-gold" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
