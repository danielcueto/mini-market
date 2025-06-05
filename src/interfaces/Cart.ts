import type { Product } from "./Product";

export interface CartItem {
  id: string;
  product: Pick<Product, "image" | "name" | "description" | "price">;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[],
}

export interface CartsContextType {
  Carts: Cart[];
  updateAllCarts: (carts: Cart[]) => void;
  getCartByUser: (userId: string) => Cart;
  deleteCart: (id: string) => void;
  addCartItem: (cartId: string, cartItem: CartItem) => void;
  deleteCartItem: (cartId: string, cartItemId: string) => void;
  updateCartItem: (cartId: string, cartItemId: string, cartItem: Partial<CartItem>) => void;
}
