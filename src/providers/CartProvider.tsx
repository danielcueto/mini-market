import { useEffect, useState, type ReactNode } from "react";
import { LOCAL_STORAGE_KEY_CARTS } from "../constants/localStorage";
import type { Cart, CartItem } from "../interfaces/Cart";
import { CartsContext } from "../contexts/CartContext";

export const CartsProvider = ({ children }: { children: ReactNode }) => {
  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CARTS);
    if (stored) {
      try {
        setCarts(JSON.parse(stored));
      } catch (error) {
        console.error("Error while parsing carts from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CARTS, JSON.stringify(carts));
  }, [carts]);

  const getCartByUser = (userId: string): Cart => {
    let cart = carts.find((c) => c.userId === userId);
    if (!cart) {
      cart = { id: crypto.randomUUID(), userId, items: [] };
      setCarts((prev) => [...prev, cart!]);
    }
    return cart;
  };

  const addCartItem = (cartId: string, cartItem: CartItem) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              items: [...cart.items, cartItem],
            }
          : cart
      )
    );
  };

  const deleteCartItem = (cartId: string, cartItemId: string) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              items: cart.items.filter((item) => item.id !== cartItemId),
            }
          : cart
      )
    );
  };

  const updateCartItem = (
    cartId: string,
    cartItemId: string,
    cartItem: Partial<CartItem>
  ) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              items: cart.items.map((item) =>
                item.id === cartItemId ? { ...item, ...cartItem } : item
              ),
            }
          : cart
      )
    );
  };

  const updateAllCarts = (newCarts: Cart[]) => {
    setCarts([...newCarts]);
  };

  const deleteCart = (id: string) => {
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
  };

  return (
    <CartsContext.Provider
      value={{
        Carts: carts,
        updateAllCarts,
        deleteCart,
        getCartByUser,
        addCartItem,
        deleteCartItem,
        updateCartItem,
      }}
    >
      {children}
    </CartsContext.Provider>
  );
};
