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
