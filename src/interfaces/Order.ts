import type { Cart } from "./Cart";

export interface Order {
    id: string;
    cart: Pick<Cart, "items" | "userId">
};

export interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  updateAllOrders: (order: Order[]) => void;
}
