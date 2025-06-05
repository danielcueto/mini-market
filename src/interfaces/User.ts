export interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface UsersContextType {
  users: User[];
  getUser: (id: string) => User | undefined;
  updateAllUsers: (product: User[]) => void;
}
