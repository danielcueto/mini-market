import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY_USERS, LOCAL_STORAGE_KEY_CURRENT_USER } from '../../constants/localStorage';
import type { User } from '../../interfaces/User';

interface UsersState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS) || '[]'),
  currentUser: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_USER) || 'null'),
  isAuthenticated: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_USER) || 'null') !== null,
};

interface SetUserLoggedPayload {
  id: string;
  isLogged: boolean;
}

interface LoginPayload {
  email: string;
  password: string;
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateAllUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setUserLoggedInStatus(state, action: PayloadAction<SetUserLoggedPayload>) {
      const { id, isLogged } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.isLogged = isLogged;
        localStorage.setItem(
          LOCAL_STORAGE_KEY_USERS,
          JSON.stringify(state.users)
        );
      }
    },
    loginUser(state, action: PayloadAction<LoginPayload>) {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password);
      
      if (user) {
        state.users.forEach(u => u.isLogged = false);
        
        user.isLogged = true;
        state.currentUser = user;
        state.isAuthenticated = true;
        
        localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
      }
    },
    logoutUser(state) {
      if (state.currentUser) {
        const user = state.users.find(u => u.id === state.currentUser?.id);
        if (user) {
          user.isLogged = false;
        }
        
        state.currentUser = null;
        state.isAuthenticated = false;
        
        localStorage.removeItem(LOCAL_STORAGE_KEY_CURRENT_USER);
      }
    },
  },
});

export const { updateAllUsers, setUserLoggedInStatus, loginUser, logoutUser } = usersSlice.actions;

export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectCurrentUser = (state: { users: UsersState }) => state.users.currentUser;
export const selectIsAuthenticated = (state: { users: UsersState }) => state.users.isAuthenticated;
export const selectUserById = (id: string) => (state: { users: UsersState }) =>
  state.users.users.find(user => user.id === id);

export default usersSlice.reducer;
