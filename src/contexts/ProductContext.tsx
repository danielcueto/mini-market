import { createContext } from "react";
import type { ProductsContextType } from "../interfaces/Product";

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);
