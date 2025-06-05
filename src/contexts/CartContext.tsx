import { createContext } from "react";
import type { CartsContextType } from "../interfaces/Cart";

export const CartsContext = createContext<CartsContextType | undefined>(
  undefined
);
