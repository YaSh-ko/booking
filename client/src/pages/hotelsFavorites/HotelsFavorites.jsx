import { Header } from '../../components/navbar/Navbar';
import { useUserContext } from '../../context/userContext';
import { useHotelDetails } from '../../hooks/useHotelDetails';
import { HotelCard } from '../../components/hotelCard/HotelCard';

export function HotelsFavorites() {
  const { favorites } = useUserContext();

  return (
    <div className="favorites-container">
      <Header />

      <span>Избранное</span>
    </div>
  );
}
