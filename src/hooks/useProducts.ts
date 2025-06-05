import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductContext";
import type { ProductsContextType } from "../interfaces/Product";

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
