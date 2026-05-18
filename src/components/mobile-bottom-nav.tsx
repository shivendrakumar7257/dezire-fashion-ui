import { Link } from "@tanstack/react-router";
import { Home, Heart, ShoppingBag, User, Shirt } from "lucide-react";
import { useStore } from "@/hooks/use-store";

export function MobileBottomNav() {
  const { setCartOpen, setWishlistOpen, cart, wishlist } = useStore();
  
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
      <div className="glass-dark mx-auto flex max-w-md items-center justify-around rounded-full px-2 py-2 text-cream shadow-luxe">
        {/* Home */}
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "text-gold" }}
          inactiveProps={{ className: "text-cream/80" }}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-[9px] uppercase tracking-[0.15em] transition-colors"
        >
          <Home className="h-5 w-5" />
          Home
        </Link>

        {/* Collection / Products */}
        <Link
          to="/products"
          activeProps={{ className: "text-gold" }}
          inactiveProps={{ className: "text-cream/80" }}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-[9px] uppercase tracking-[0.15em] transition-colors"
        >
          <Shirt className="h-5 w-5" />
          Shop
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => setWishlistOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-[9px] uppercase tracking-[0.15em] text-cream/80 transition-colors relative cursor-pointer"
        >
          <Heart className="h-5 w-5" />
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-ink">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => setCartOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-[9px] uppercase tracking-[0.15em] text-cream/80 transition-colors relative cursor-pointer"
        >
          <ShoppingBag className="h-5 w-5" />
          Cart
          {totalCartItems > 0 && (
            <span className="absolute right-2 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-ink">
              {totalCartItems}
            </span>
          )}
        </button>

        {/* Account */}
        <Link
          to="/login"
          activeProps={{ className: "text-gold" }}
          inactiveProps={{ className: "text-cream/80" }}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-[9px] uppercase tracking-[0.15em] transition-colors"
        >
          <User className="h-5 w-5" />
          Account
        </Link>
      </div>
    </nav>
  );
}
