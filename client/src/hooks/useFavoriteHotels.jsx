import { useState, useCallback } from 'react'; // ← добавьте useCallback
import { getHotelsByFavorites } from '../services/api';

export function useFavoriteHotels() {
  const [FavoriteHotels, setFavoriteHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Оберните в useCallback!
  const handleFavoriteHotels = useCallback(async (ids) => {
    setIsLoading(true);
    try {
      const result = await getHotelsByFavorites(ids);
      console.log('Hotels loaded:', result);
      setFavoriteHotels(result);
    } catch (err) {
      // Обработка ошибок...
    } finally {
      setIsLoading(false);
    }
  }, []); // ← пустой массив зависимостей

  return { FavoriteHotels, handleFavoriteHotels, isLoading };
}
