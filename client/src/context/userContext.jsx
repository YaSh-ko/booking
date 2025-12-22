import { useCallback, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { authApi } from '../services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = useCallback((hotel) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((h) => h.id !== hotel.id);
      const updated = [hotel, ...filtered].slice(0, 4);
      console.log(updated);
      return updated;
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authApi.me();
        setUser(userData.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        recentlyViewed,
        addToRecentlyViewed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
}
