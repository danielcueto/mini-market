import { useEffect, useState, type ReactNode } from "react";
import { LOCAL_STORAGE_KEY_USERS } from "../constants/localStorage";
import type { User } from "../interfaces/User";
import { UsersContext } from "../contexts/UserContext";

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch (error) {
        console.error("Error while parsing users from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  const getUser = (id: string): User | undefined => {
    return users.find((user) => user.id === id);
  };

  const updateAllUsers = (newUsers: User[]) => {
    setUsers([...newUsers]);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        getUser,
        updateAllUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
