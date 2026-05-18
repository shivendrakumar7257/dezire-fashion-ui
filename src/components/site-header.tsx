import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

import { useStore } from "@/hooks/use-store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart, wishlist, setCartOpen, setWishlistOpen } = useStore();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background text-foreground shadow-sm border-b border-border">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 lg:h-20 lg:px-10">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png.jpeg" alt="Dezire Fashion" className="h-16 lg:h-20 w-auto object-contain mix-blend-multiply" />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-foreground/70" }}
                className="text-[11px] uppercase tracking-[0.28em] transition-colors hover:text-foreground gold-underline"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <IconBtn label="Search"><Search className="h-[18px] w-[18px]" /></IconBtn>
            <IconBtn label="Wishlist" onClick={() => setWishlistOpen(true)} badge={wishlistCount > 0 ? wishlistCount : undefined}>
              <Heart className="h-[18px] w-[18px]" />
            </IconBtn>
            <IconBtn label="Cart" onClick={() => setCartOpen(true)} badge={totalCartItems > 0 ? totalCartItems : undefined}>
              <ShoppingBag className="h-[18px] w-[18px]" />
            </IconBtn>
            <Link
              to="/login"
              aria-label="Account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-foreground/5"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-foreground/5 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg lg:hidden animate-fade-up">
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-lg tracking-[0.2em]">DEZIRE<span className="text-gold">.</span>FASHION</span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="h-10 w-10 inline-flex items-center justify-center">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-8 pt-12">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl py-2"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-12 left-0 right-0 px-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Get in touch</p>
            <p className="mt-2 text-sm">hello@dezirefashion.com</p>
            <p className="text-sm text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
      )}
    </>
  );
}

function IconBtn({ children, label, badge, onClick }: { children: React.ReactNode; label: string; badge?: number; onClick?: () => void }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-foreground/5 cursor-pointer"
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
