import { Header } from '../../components/navbar/Navbar';
import { useUserContext } from '../../context/userContext';
import { BookingCard } from '../../components/bookingCard/bookingCard';
import { Loader } from '../../components/loader/Loader';
import { useEffect } from 'react';
import './addedBookingsPage.scss';
import { Link } from 'react-router-dom';

export function AddedBookingsPage() {
  const { bookings, isLoading, updateBookings, user } = useUserContext();

  useEffect(() => {
    // Обновляем бронирования только если:
    // 1. Пользователь авторизован
    // 2. Бронирования еще не загружены (null)
    // 3. Не идет загрузка
    // Это предотвращает множественные запросы
    if (user && !isLoading && bookings === null) {
      updateBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  const handleClickHotelDetails = (id) => {
    window.open(`/hotel/details/${id}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bookings">
      <Header />
      {isLoading ? (
        <div className="bookings__loader">
          <Loader />
        </div>
      ) : (
        <div className="bookings__content">
          <h1 className="section-title">Мои бронирования</h1>
          {bookings && bookings.length > 0 ? (
            <div className="bookings__list">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onClickDetails={handleClickHotelDetails}
                />
              ))}
            </div>
          ) : (
            <div className="bookings__empty">
              <span className="bookings__message">У вас нет бронирований</span>
              <span>
                Перейдите на страницу{' '}
                <Link to="/search" className="bookings__link">
                  поиска отелей{' '}
                </Link>
                чтобы забронировать номер
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
