import { Header } from '../../components/navbar/Navbar';
import { useUserContext } from '../../context/userContext';
import { HotelCard } from '../../components/hotelCard/HotelCard';
import { useFavoriteHotels } from '../../hooks/useFavoriteHotels';
import { Loader } from '../../components/loader/Loader';
import { useEffect } from 'react';
import './hotelsFavorites.scss';
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/searchContext';
export function HotelsFavorites() {
  const { favoriteHotels, fetchFavorites, isLoading } = useFavoriteHotels();
  const { searchData } = useSearch();
  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleClickHotelDetails = (id) => {
    const params = new URLSearchParams({
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString(),
    }).toString();

    window.open(`/hotel/details/${id}?${params}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="favorites">
      <Header />
      {isLoading ? (
        <div className="favorites__loader">
          <Loader />
        </div>
      ) : (
        <div className="favorites__content">
          <h1 className="section-title">Любимые отели</h1>
          {favoriteHotels.length !== 0 ? (
            <div>
              {favoriteHotels.map((favoriteHotel) => (
                <HotelCard
                  key={favoriteHotel.id}
                  hotel={favoriteHotel.hotels}
                  onClickDetails={handleClickHotelDetails}
                />
              ))}
            </div>
          ) : (
            <div>
              <span className="favorites__message">У вас нет избранных</span>
              <span>
                Перейдите на страницу{' '}
                <Link to="/search" className="favorites__link">
                  поиска отелей{' '}
                </Link>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
