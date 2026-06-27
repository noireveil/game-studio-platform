import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Game, CartItem } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  isInCart: (gameId: string) => boolean;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  reloadCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to get cart key for current user
const getCartKey = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // Use a hash of the token as user identifier
    return `cart_${token.substring(0, 20)}`;
  }
  return 'cart_guest';
};

// Load cart from localStorage
const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(getCartKey());
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCart = (items: CartItem[], cartKey: string) => {
  localStorage.setItem(cartKey, JSON.stringify(items));
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentCartKey, setCurrentCartKey] = useState<string>(getCartKey());

  // Function to reload cart based on current auth state
  const reloadCart = useCallback(() => {
    const newCartKey = getCartKey();
    setCurrentCartKey(newCartKey);
    setCartItems(loadCart());
  }, []);

  // Load cart on mount
  useEffect(() => {
    reloadCart();
  }, [reloadCart]);

  // Monitor for auth token changes
  useEffect(() => {
    const checkAuthChange = setInterval(() => {
      const newCartKey = getCartKey();
      if (newCartKey !== currentCartKey) {
        setCurrentCartKey(newCartKey);
        setCartItems(loadCart());
      }
    }, 500);

    return () => clearInterval(checkAuthChange);
  }, [currentCartKey]);

  // Save cart whenever it changes
  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem(currentCartKey)) {
      saveCart(cartItems, currentCartKey);
    }
  }, [cartItems, currentCartKey]);

  const addToCart = (game: Game) => {
    setCartItems((prev) => {
      // Check if game already in cart (1 account = 1 game)
      const existing = prev.find((item) => item.game.id === game.id);
      if (existing) {
        return prev; // Already in cart, don't add again
      }
      return [...prev, { game }];
    });
  };

  const removeFromCart = (gameId: string) => {
    setCartItems((prev) => prev.filter((item) => item.game.id !== gameId));
  };

  const isInCart = (gameId: string) => {
    return cartItems.some((item) => item.game.id === gameId);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(currentCartKey);
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.game.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        totalItems,
        totalPrice,
        reloadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
