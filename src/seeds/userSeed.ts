import type { User } from "../interfaces/User";

export const users: User[] = [
  {
    id: "admin-1",
    username: "admin1",
    role: "admin",
    email: "admin1@example.com",
    password: "admin123",
  },
  {
    id: "admin-2",
    username: "admin2",
    role: "admin",
    email: "admin2@example.com",
    password: "admin123",
  },
  {
    id: "client-1",
    username: "client1",
    role: "client",
    email: "client1@example.com",
    password: "client123",
  },
  {
    id: "client-2",
    username: "client2",
    role: "client",
    email: "client2@example.com",
    password: "client123",
  },
  {
    id: "client-3",
    username: "client3",
    role: "client",
    email: "client3@example.com",
    password: "client123",
  },
];
