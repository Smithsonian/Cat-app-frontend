import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const verifySession = useCallback(async () => {
    if (token) {
      setLoading(true);
      const options = {
        headers: {
          token
        }
      };
      const res = await fetch(
        `${process.env.REACT_APP_OBSERVATION_API}/auth/verify-session`,
        options
      );
      const { success, user, error } = await res.json();
      if (success) {
        setIsAuthenticated(true);
        setUser(user);
        setLoading(false);
      } else if (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        reportError(error);
        setLoading(false);
      }
    }
  }, [token]);

  const signIn = async credentials => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };
    const res = await fetch(`${process.env.REACT_APP_OBSERVATION_API}/auth/signin`, options);
    const { token, error, details } = await res.json();
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
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const reportError = error => {
    setError(error);
    setTimeout(() => setError(null), 3000);
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, token, user, error, signIn, signOut, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
