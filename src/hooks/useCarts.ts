import { useContext } from "react";
import { CartsContext } from "../contexts/CartContext";
import type { CartsContextType } from "../interfaces/Cart";

export const useCarts = (): CartsContextType => {
  const context = useContext(CartsContext);
  if (!context) {
    throw new Error("useCarts must be used within a CartsProvider");
  }
  return context;
};
