import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { authApi, getFavorites } from '../services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Загружаем пользователя
        const userData = await authApi.me();
        setUser(userData.user);

        // 2. Если пользователь есть, загружаем избранное
        if (userData.user) {
          const favoritesData = await getFavorites();
          setFavorites(favoritesData);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const login = (userData) => {
    setUser(userData);
    getFavorites()
      .then((data) => setFavorites(data))
      .catch(console.error);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        isLoading,
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
