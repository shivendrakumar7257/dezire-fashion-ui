import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  cartOpen: boolean;
  wishlistOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("dezire_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("dezire_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("dezire_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dezire_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: string, qty = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        return next;
      }

      return [...prev, { product, size, quantity: qty }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartOpen,
        wishlistOpen,
        setCartOpen,
        setWishlistOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isWishlisted,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
