import { useState } from 'react';
import { bookingApi, getRoomDetails } from '../services/api';
import {
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '../services/error';
import { useUserContext } from '../context/userContext';
import toast from 'react-hot-toast';

export function useBooking() {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { logout, updateBookings } = useUserContext();

  const handleBooking = async (roomId, checkIn, checkOut) => {
    setIsLoading(true);
    try {
      const result = await bookingApi.createBooking(roomId, checkIn, checkOut);
      toast.success('Вы успешно забронировали отель');
      setBooking(result);
      console.log(booking);
      // Обновляем список бронирований после успешного создания
      await updateBookings();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        logout();
        toast.error('Сессия истекла. Пожалуйста, войдите снова');
      } else if (err instanceof BadRequestError) {
        toast.error('Проверьте параметры поиска');
      } else if (err instanceof NetworkError) {
        toast.error('Проверьте интернет-соединение');
      } else if (err instanceof NotFoundError) {
        toast.error('По вашему запросу ничего не найдено');
      } else if (err instanceof ServerError) {
        toast.error('Проблемы на сервере, попробуйте позже');
      } else {
        toast.error('Произошла ошибка при создании бронирования');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { booking, handleBooking, isLoading };
}
