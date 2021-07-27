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
        data: { user }
      } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/auth/create-user`, newUser);
      if (user) {
        toast.success('User created. An email has been sent');
        setUsersInApp(prev => [user, ...prev]);
        setLoading(false);
      }
    } catch ({ response }) {
      if (response) {
        const {
          data: { error, details }
        } = response;
        if (error) {
          toast.error(error);
          setLoading(false);
        }
        if (details) {
          toast.error(details[0].message);
          setLoading(false);
        }
      } else {
        toast.error('Network error');
        setLoading(false);
        setTimeout(() => signOut(), 3000);
      }
    }
  };

  const toggleStatus = async id => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_OBSERVATION_API}/auth/status/${id}`
      );

      toast.success(`User's status updated`);
      setUsersInApp(prev => prev.map(u => (u._id === id ? data : u)));
      setLoading(false);
    } catch ({ response }) {
      if (response) {
        const {
          data: { error }
        } = response;
        if (error) {
          toast.error(error);
          setLoading(false);
        }
      } else {
        toast.error('Network error');
        setLoading(false);
        setTimeout(() => signOut(), 3000);
      }
    }
  };

  const toggleRole = async id => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_OBSERVATION_API}/auth/role/${id}`
      );

      toast.success(`User's role updated`);
      setUsersInApp(prev => prev.map(u => (u._id === id ? data : u)));
      setLoading(false);
    } catch ({ response }) {
      if (response) {
        const {
          data: { error }
        } = response;
        if (error) {
          toast.error(error);
          setLoading(false);
        }
      } else {
        toast.error('Network error');
        setLoading(false);
        setTimeout(() => signOut(), 3000);
      }
    }
  };

  const signIn = async credentials => {
    setLoading(true);
    try {
      const {
        data: { token }
      } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/auth/signin`, credentials);

      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
        setAuthToken(token);
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch ({ response }) {
      if (response) {
        const {
          data: { error, details }
        } = response;
        if (error) {
          reportError(error);
          setLoading(false);
        }
        if (details) {
          reportError(details[0].message);
          setLoading(false);
        }
      } else {
        reportError('Network error');
        setLoading(false);
      }
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
          data: { success, user }
        } = await axios.get(
          `${process.env.REACT_APP_OBSERVATION_API}/auth/verify-session`,
          options
        );
        if (success) {
          setAuthToken(token);
          setIsAuthenticated(true);
          setUser(user);
          setLoading(false);
        }
      } catch ({ response }) {
        if (response) {
          const {
            data: { error }
          } = response;
          if (error) {
            localStorage.removeItem('token');
            reportError(error);
            setLoading(false);
            setTimeout(() => signOut(), 3000);
          }
        } else {
          localStorage.removeItem('token');
          reportError('Network error');
          setLoading(false);
          setTimeout(() => signOut(), 3000);
        }
      }
    }
  }, [token, signOut]);

  const getUsers = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      if (user.role !== 'user') {
        setLoading(true);
        try {
          const {
            data: { users }
          } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/auth/users`);
          if (users) {
            setUsersInApp(users.filter(u => u._id !== user._id));
            setLoading(false);
          }
        } catch ({ response }) {
          if (response) {
            const {
              data: { error }
            } = response;
            if (error) {
              toast.error(error);
              setLoading(false);
            }
          } else {
            toast.error('Network error');
            setLoading(false);
            setTimeout(() => signOut(), 3000);
          }
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
        toggleStatus,
        toggleRole,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
