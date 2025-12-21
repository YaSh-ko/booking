import { useState } from 'react';
import { getHotelDetails, getRoomDetails } from '../services/api';
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
} from '../services/error';

export function useHotelDetails() {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoomDetails = async (id) => {
    setIsLoading(true);
    try {
      const result = await getRoomDetails(id);
      setRoom(result);
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

  return { room, handleRoomDetails, isLoading };
}
