import { createContext } from "react";
import type { UsersContextType } from "../interfaces/User";

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined
);
