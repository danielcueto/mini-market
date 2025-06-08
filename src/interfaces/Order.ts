import type { Cart } from "./Cart";

export interface Order {
    id: string;
    cart: Pick<Cart, "items" | "userId">;
    total: number;
    customerName: string;
    date: Date
};
