import { useState } from 'react';
import { searchHotels } from '../services/api';
import toast from 'react-hot-toast';
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
} from '../services/error';

export const useHotelsSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (params) => {
    setIsLoading(true);

    try {
      const result = await searchHotels(params);
      setHotels(result);
    } catch (err) {
      if (err instanceof BadRequestError) {
        toast.error('Проверьте параметры поиска');
      } else if (err instanceof NetworkError) {
        toast.error('Проверьте интернет-соединение');
      } else if (err instanceof NotFoundError) {
        toast.error('По вашему запросу ничего не найдено');
      } else if (err instanceof ServerError) {
        toast.error('Проблемы на сервере, попробуйте позже');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { hotels, isLoading, handleSearch };
};
