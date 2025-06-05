import { createContext } from "react";
import type { OrdersContextType } from "../interfaces/Order";

export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined
);
