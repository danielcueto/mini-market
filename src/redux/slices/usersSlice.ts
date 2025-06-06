import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY_USERS } from '../../constants/localStorage';
import type { User } from '../../interfaces/User';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS) || '[]'),
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateAllUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const { updateAllUsers } = usersSlice.actions;

export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectUserById = (id: string) => (state: { users: UsersState }) =>
  state.users.users.find(user => user.id === id);

export default usersSlice.reducer;
