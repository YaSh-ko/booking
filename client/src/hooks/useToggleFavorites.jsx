import { useState } from 'react';
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '../services/error';
import { toggleFavorites } from '../services/api';

export function useToggleFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(true);

  const handleToggleFavorites = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      return await toggleFavorites(id);
    } catch (err) {
      if (err instanceof BadRequestError) {
        setError('Неверные данные');
        setAuth(false);
      }
      if (err instanceof UnauthorizedError) {
        setError('Не авторизован');
        setAuth(false);
      } else if (err instanceof NetworkError) setError('Проблемы с сетью');
      else if (err instanceof NotFoundError) setError('Не найдено');
      else if (err instanceof ServerError) setError('Ошибка сервера');
      else setError('Неизвестная ошибка');

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleToggleFavorites,
    isLoading,
    auth,
    error,
    clearError: () => setError(null),
  };
}
