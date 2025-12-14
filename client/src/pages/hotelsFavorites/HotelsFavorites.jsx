import { Header } from '../../components/navbar/Navbar';
import { useUserContext } from '../../context/userContext';
import { useHotelDetails } from '../../hooks/useHotelDetails';
import { HotelCard } from '../../components/hotelCard/HotelCard';
import { useFavoriteHotels } from '../../hooks/useFavoriteHotels';
import { Loader } from '../../components/loader/Loader';
import { getFavorites } from '../../services/api';
import { useEffect } from 'react';

export function HotelsFavorites() {
  const { favorites } = useUserContext();
  const { favoriteHotels, handleFavoriteHotels, isLoading } = useFavoriteHotels();

  useEffect(() => {
    handleFavoriteHotels(favorites);
  }, [favorites]);
  return (
    <div className="favorites-container">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* {favoriteHotels.map((favoriteHotel) => (
            <HotelCard key={favoriteHotel.id} hotel={favoriteHotel} />
          ))} */}
        </div>
      )}
      <span>Избранное</span>
    </div>
  );
}
