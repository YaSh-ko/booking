import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/navbar/Navbar';
import { useRoomDetails } from '../../hooks/useRoom';
import { useEffect } from 'react';
import { useSearch } from '../../context/searchContext';
import { Loader } from '../../components/loader/Loader';
import { BookingContent } from '../../components/BookingContent/BookingContent';

export function BookingPage() {
  const { room, handleRoomDetails, isLoading } = useRoomDetails();
  const { roomId } = useParams();
  const { searchData } = useSearch();
  const navigate = useNavigate();
  console.log(searchData);
  useEffect(() => {
    handleRoomDetails(roomId);
  }, [roomId]);

  const handleItherPricesClick = () => {
    navigate(-1);
  };
  const bookingContent = () => {
    if (isLoading) {
      return (
        <div className="booking-page__loader">
          <Loader />
        </div>
      );
    }
    if (!room) {
      return (
        <div>
          <p>Данная комната не найдена</p>
        </div>
      );
    }
    return (
      <BookingContent
        room={room.room}
        searchData={searchData}
        onClick={handleItherPricesClick}
      />
    );
  };
  return (
    <div className="booking-page">
      <Header />

      <div className="main-content">{bookingContent()}</div>
    </div>
  );
}
