import { useState } from 'react';
import { getHotelDetails } from '../services/api';
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
} from '../services/error';

export function useHotelDetails() {
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleHotelDetails = async (id, checkIn, checkOut) => {
    setIsLoading(true);
    try {
      const result = await getHotelDetails(id, checkIn, checkOut);
      setHotel(result);
    } catch (err) {
      if (err instanceof BadRequestError) {
        alert('Проверьте параметры поиска');
      } else if (err instanceof NetworkError) {
        alert('Проверьте интернет-соединение');
      } else if (err instanceof NotFoundError) {
        alert('По вашему запросу ничего не найдено');
      } else if (err instanceof ServerError) {
        alert('Проблемы на сервере, попробуйте позже');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { hotel, handleHotelDetails, isLoading };
}
