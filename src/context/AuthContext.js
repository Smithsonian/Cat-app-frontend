import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState({});
  const [usersInApp, setUsersInApp] = useState([]);
  const [error, setError] = useState(null);

  const createUser = async newUser => {
    setLoading(true);
    try {
      const {
        data: { user, error, details }
      } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/auth/create-user`, newUser);
      if (error) {
        toast.error(error);
        setLoading(false);
      }
      if (details) {
        toast.error(details.message);
        setLoading(false);
      }
      if (user) {
        toast.success('User created. An email has been sent');
        setUsersInApp(prev => [user, ...prev]);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const signIn = async credentials => {
    setLoading(true);
    try {
      const {
        data: { token, error, details }
      } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/auth/signin`, credentials);
      if (error) {
        reportError(error);
        setLoading(false);
      }
      if (details) {
        reportError(details.message);
        setLoading(false);
      }
      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
        setAuthToken(token);
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (error) {
      reportError('Service is offline. Contact your admin');
      setLoading(false);
    }
  };

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setAuthToken();
    setUser({});
    setUsersInApp([]);
    setIsAuthenticated(false);
  }, []);

  const verifySession = useCallback(async () => {
    if (token) {
      setLoading(true);
      const options = {
        headers: {
          token
        }
      };
      try {
        const {
          data: { success, user, error }
        } = await axios.get(
          `${process.env.REACT_APP_OBSERVATION_API}/auth/verify-session`,
          options
        );
        if (success) {
          setAuthToken(token);
          setIsAuthenticated(true);
          setUser(user);
          setLoading(false);
        } else if (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          reportError(error);
          setLoading(false);
        }
      } catch (error) {
        localStorage.removeItem('token');
        reportError('Service is offline. Contact your admin');
        setLoading(false);
        setTimeout(() => signOut(), 3000);
      }
    }
  }, [token, signOut]);

  const getUsers = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      if (user.role !== 'user') {
        setLoading(true);
        try {
          const {
            data: { users, error }
          } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/auth/users`);
          if (error) {
            toast.error(error);
            setLoading(false);
          }
          if (users) {
            setUsersInApp(users);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          toast.error('Service is offline. Contact your admin');
          setLoading(false);
          setTimeout(() => signOut(), 3000);
        }
      }
    }
  }, [user, signOut]);

  const reportError = error => {
    setError(error);
    setTimeout(() => setError(null), 3000);
  };

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        token,
        user,
        usersInApp,
        error,
        createUser,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
