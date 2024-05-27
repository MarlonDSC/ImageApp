import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
      // handle error
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};
