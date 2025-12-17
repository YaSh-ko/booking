import { useState, useCallback, useEffect } from 'react';
import { getFavorites, toggleFavorites as toggleFavoriteApi } from '../services/api';
import { useUserContext } from '../context/userContext';

export function useFavoriteHotels() {
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUserContext();
  useEffect(() => {
    if (user) fetchFavorites();
    else setFavoriteHotels([]);
  }, [user]);
  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const favorites = await getFavorites();
      setFavoriteHotels(favorites);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(
    async (hotelId) => {
      try {
        const result = await toggleFavoriteApi(hotelId);
        console.log('Toggle result:', result); // ← для отладки

        await fetchFavorites();

        return result;
      } catch (err) {
        console.error('Failed to toggle favorite:', err);
        throw err;
      }
    },
    [fetchFavorites],
  );

  const isFavorite = useCallback(
    (hotelId) => {
      return favoriteHotels.some((fav) => fav.hotel_id === hotelId);
    },
    [favoriteHotels],
  );

  return {
    favoriteHotels,
    isLoading,
    error,
    fetchFavorites,
    toggleFavorite,
    isFavorite,
    clearError: () => setError(null),
  };
}
