import { useContext } from "react";
import { OrdersContext } from "../contexts/OrderContext";
import type { OrdersContextType } from "../interfaces/Order";

export const useOrders = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within a OrdersProvider");
  }
  return context;
};
