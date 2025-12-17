import { useState } from 'react';
import { authApi } from '../services/api';
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
} from '../services/error';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handle = async (fn) => {
    setIsLoading(true);
    setError(null);

    try {
      return await fn();
    } catch (err) {
      if (err instanceof BadRequestError) setError('Неверные данные');
      else if (err instanceof NetworkError) setError('Проблемы с сетью');
      else if (err instanceof NotFoundError) setError('Не найдено');
      else if (err instanceof ServerError) setError('Ошибка сервера');
      else setError('Неизвестная ошибка');

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendCode: (email, name) => handle(() => authApi.sendCode(email, name)),
    verifyCode: (email, code) => handle(() => authApi.verifyCode(email, code)),
    me: () => handle(() => authApi.me()),
    logout: () => handle(() => authApi.logout()),
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
