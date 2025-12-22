import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/navbar/Navbar';
import { useRoomDetails } from '../../hooks/useRoom';

import Footer from '../../components/footer/footer';
import { useEffect, useState } from 'react';
import { useSearch } from '../../context/searchContext';
import { Loader } from '../../components/loader/Loader';
import { BookingContent } from '../../components/BookingContent/BookingContent';
import { PaymentForm } from '../../components/paymantForm/PaymantForm';
import './bookingPage.scss';
import { useUserContext } from '../../context/userContext';
import { Modal } from '../../components/modal/Modal';
export function BookingPage() {
  const { room, handleRoomDetails, isLoading } = useRoomDetails();
  const { roomId } = useParams();
  const searchData = Object.fromEntries(new URLSearchParams(location.search));
  const [authModal, setAuthModal] = useState(false);
  const navigate = useNavigate();
  const liveTime = new Date(searchData.checkOut) - new Date(searchData.checkIn);
  const daysCount = Math.ceil(liveTime / (1000 * 60 * 60 * 24));
  const { user } = useUserContext();
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
        <div className="booking-page__no-data">
          <p>Данная комната не найдена</p>
        </div>
      );
    }
    return (
      <BookingContent
        user={user}
        room={room.room}
        searchData={searchData}
        onClick={handleItherPricesClick}
        onClickModal={setAuthModal}
        daysCount={daysCount}
      />
    );
  };
  return (
    <div className="booking-page">
      <Header />

      <div className="main-content">{bookingContent()}</div>
      <Footer />
      {authModal && (
        <Modal open={authModal} onClose={() => setAuthModal(false)} modalType="auth" />
      )}
    </div>
  );
}
