import { useParams } from 'react-router-dom';
import { useHotelDetails } from '../../hooks/useHotelDetails';
import { useEffect } from 'react';
import { Loader } from '../../components/loader/Loader';
import { Header } from '../../components/navbar/Navbar';

export function HotelPage() {
  const { id } = useParams();
  const { hotel, handleHotelDetails, isLoading } = useHotelDetails();

  useEffect(() => {
    if (id) handleHotelDetails(Number(id));
  }, [id]);

  return (
    <div className="hotelpage__container">
      <Header />
      {isLoading ? <Loader /> : hotel ? <h1>{hotel.name}</h1> : <p>Отель не найден</p>}
    </div>
  );
}
