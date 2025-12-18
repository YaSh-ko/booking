import { useState } from 'react';
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
} from '../services/error';
import { reviewApi } from '../services/api';

export function useReviewApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReviewApi = async (fn) => {
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
    addReview: (hotel_id, rating, comment) =>
      handleReviewApi(() => reviewApi.addReview(hotel_id, rating, comment)),
    deleteReview: (hotel_id) => handleReviewApi(() => reviewApi.deleteReview(hotel_id)),
    getReview: (hotel_id) => handleReviewApi(() => reviewApi.getReview(hotel_id)),
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
