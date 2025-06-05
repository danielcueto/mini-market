import { useContext } from "react";
import { UsersContext } from "../contexts/UserContext";
import type { UsersContextType } from "../interfaces/User";

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
