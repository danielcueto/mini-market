import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import { updateAllUsers, selectUsers, selectUserById } from '../redux/slices/usersSlice';
import type { User } from '../interfaces/User';

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);

  return {
    users,
    getUser: (id: string) => useSelector(selectUserById(id)),
    updateAllUsers: (newUsers: User[]) => dispatch(updateAllUsers(newUsers)),
  };
};
