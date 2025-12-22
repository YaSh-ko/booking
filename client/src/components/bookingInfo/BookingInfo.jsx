import './bookingInfo.scss';

export function BookingInfo({ city, searchData, isBookingData = true, daysCount }) {
  if (!isBookingData) return null;

  return (
    <div className="booking-info">
      {/* Город */}
      <div className="booking-info__item booking-info__item--city">
        <svg
          className="booking-info__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="30"
          height="30"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
        </svg>
        <div className="booking-info__content">
          <span className="booking-info__label">Город</span>
          <span className="booking-info__value">
            <b>{city}</b>
          </span>
        </div>
      </div>

      {/* Даты */}
      <div className="booking-info__item booking-info__item--date">
        <svg
          className="booking-info__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="30"
          height="30"
        >
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
        <div className="booking-info__content">
          <span className="booking-info__label">Даты проживания</span>
          <span className="booking-info__value">
            <b>{searchData.checkIn}</b> – <b>{searchData.checkOut}</b>
            <span className="booking-info__days">({daysCount} суток)</span>
          </span>
        </div>
      </div>

      {/* Гости */}
      <div className="booking-info__item booking-info__item--guests">
        <svg
          className="booking-info__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="30"
          height="30"
        >
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
        <div className="booking-info__content">
          <span className="booking-info__label">Гости</span>
          <span className="booking-info__value">
            <b>{searchData.guests}</b>{' '}
            {searchData.guests === 1
              ? 'гость'
              : searchData.guests >= 2 && searchData.guests <= 4
                ? 'гостя'
                : 'гостей'}
          </span>
        </div>
      </div>
    </div>
  );
}
