import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser, logoutUser, selectCurrentUser, selectIsAuthenticated } from '../redux/slices/usersSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const login = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }
    return true;
  };

  const requireRole = (role: string) => {
    if (!isAuthenticated || currentUser?.role !== role) {
      navigate('/');
      return false;
    }
    return true;
  };

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    requireAuth,
    requireRole,
  };
}
