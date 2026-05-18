import { Link } from "@tanstack/react-router";
import { Home, Heart, ShoppingBag, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/products", label: "Shop", Icon: Heart },
  { to: "/products", label: "Cart", Icon: ShoppingBag },
  { to: "/login", label: "Account", Icon: User },
] as const;

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
      <div className="glass-dark mx-auto flex max-w-md items-center justify-around rounded-full px-3 py-2 text-cream shadow-luxe">
        {items.map(({ to, label, Icon }) => (
          <Link
            key={label}
            to={to}
            activeOptions={{ exact: to === "/" }}
            activeProps={{ className: "text-gold" }}
            inactiveProps={{ className: "text-cream/80" }}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors"
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
