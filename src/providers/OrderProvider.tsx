import { useEffect, useState, type ReactNode } from "react";
import { LOCAL_STORAGE_KEY_ORDERS } from "../constants/localStorage";
import type { Order } from "../interfaces/Order";
import { OrdersContext } from "../contexts/OrderContext";

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS);
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch (error) {
        console.error("Error while parsing orders from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };

  const getOrder = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  const updateAllOrders = (newOrders: Order[]) => {
    setOrders([...newOrders]);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrder,
        updateAllOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
