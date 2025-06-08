import type { Order } from "../interfaces/Order";
import { carts } from "./cartSeed";
export const orders: Order[] = [
  {
    id: "order-1",
    cart: {
      userId: carts[0].userId,
      items: carts[0].items,
    },
    customerName: "client-1",
    date: Date.now(),
    total: 89.97
  },
  {
    id: "order-2",
    cart: {
      userId: carts[1].userId,
      items: carts[1].items,
    },
    customerName: "client-2",
    date: Date.now(),
    total: 24.99
  },
];
