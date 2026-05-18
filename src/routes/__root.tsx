import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { AiAssistant } from "@/components/ai-assistant";
import { StoreProvider } from "@/hooks/use-store";
import { CartDrawer } from "@/components/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist-drawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-foreground">404</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Page not found
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-charcoal"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-primary px-6 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 pb-24 lg:pb-0">
          <Outlet />
        </main>
        <SiteFooter />
        <MobileBottomNav />
        <AiAssistant />
        <CartDrawer />
        <WishlistDrawer />
      </div>
    </StoreProvider>
  );
}
