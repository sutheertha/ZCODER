import { createContext, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // LocalStorage ko check karna for saved session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = (e) => {
    e.preventDefault()
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    history.push('/login');
  };

  const value = {
    currentUser,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};