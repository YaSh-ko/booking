import { useCallback, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { authApi, bookingApi } from '../services/api';
import { UnauthorizedError } from '../services/error';
import toast from 'react-hot-toast';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Восстанавливаем пользователя из localStorage при инициализации
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Ошибка при чтении пользователя из localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  const [bookings, setBookings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('recentlyViewed');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Ошибка при чтении recentlyViewed из localStorage:', error);
      localStorage.removeItem('recentlyViewed');
      return [];
    }
  });

  // Сохраняем recentlyViewed в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Ошибка при сохранении recentlyViewed в localStorage:', error);
    }
  }, [recentlyViewed]);

  // Сохраняем пользователя в localStorage при изменении
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Ошибка при сохранении пользователя в localStorage:', error);
    }
  }, [user]);

  const addToRecentlyViewed = useCallback((hotel) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((h) => h.id !== hotel.id);
      const updated = [hotel, ...filtered].slice(0, 4);
      console.log(updated);
      return updated;
    });
  }, []);

  // Функция для очистки пользователя при ошибке авторизации
  const clearUserOnAuthError = useCallback(() => {
    setUser(null);
    setBookings(null);
    localStorage.removeItem('user');
  }, []);

  // Проверяем авторизацию при монтировании
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authApi.me();
        setUser(userData.user);

        try {
          const userBookings = await bookingApi.myBookings();
          setBookings(userBookings);
          console.log(userBookings);
        } catch (err) {
          console.error('Ошибка при загрузке бронирований:', err);
          // Если это ошибка авторизации, разлогиниваем пользователя
          if (err instanceof UnauthorizedError) {
            clearUserOnAuthError();
            toast.error('Сессия истекла. Пожалуйста, войдите снова');
          } else {
            // Устанавливаем пустой массив вместо null, чтобы различать "загружено, но пусто" от "ошибка"
            setBookings([]);
          }
        }
      } catch (err) {
        console.error('Ошибка при проверке авторизации:', err);
        // Если токен устарел или недействителен, очищаем пользователя
        clearUserOnAuthError();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [clearUserOnAuthError]);

  const updateBookings = async () => {
    try {
      const userBookings = await bookingApi.myBookings();
      console.log(userBookings);
      setBookings(userBookings || []);
    } catch (err) {
      console.error('Ошибка при обновлении бронирований:', err);
      // Если это ошибка авторизации, разлогиниваем пользователя
      if (err instanceof UnauthorizedError) {
        clearUserOnAuthError();
        toast.error('Сессия истекла. Пожалуйста, войдите снова');
      } else {
        toast.error('Не удалось обновить бронирования');
        // Сохраняем текущие бронирования, не сбрасываем их
      }
    }
  };

  const login = (userData) => {
    setUser(userData);
    toast.success('Добро пожаловать! Вы успешно вошли');
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      setBookings(null);
      localStorage.removeItem('user');
      toast.success('Вы успешно вышли из аккаунта');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
      // Все равно очищаем состояние, даже если запрос не удался
      setUser(null);
      setBookings(null);
      localStorage.removeItem('user');
      toast.success('Вы вышли из аккаунта');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        bookings,
        updateBookings,
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
  if (!context) throw new Error('useUserContext must be used within UserProvider');
  return context;
}
