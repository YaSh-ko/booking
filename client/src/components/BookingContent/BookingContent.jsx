import { formatPrice } from '../../utils/formatPrice';
import { AmenityList } from '../amenityList/AmenityList';
import { BookingInfo } from '../bookingInfo/BookingInfo';
import './bookingContent.scss';
export function BookingContent({ room, searchData, onClick }) {
  const liveTime = new Date(searchData.checkOut) - new Date(searchData.checkIn);
  const daysCount = Math.ceil(liveTime / (1000 * 60 * 60 * 24));
  const { capacity, image_url, price_per_night, room_number, room_type, hotels } = room;
  console.log(room);
  return (
    <div className="booking-content">
      <div className="room-card room-card--booking">
        <img
          src={image_url}
          alt={`Номер ${room_number}`}
          className="room-card__image room-card__image--booking"
        />

        <div className="room-card__content">
          <div className="room-card__header">
            <h3 className="room-card__title">Номер {room_number}</h3>
            <span className="room-card__type">{room_type}</span>
          </div>

          <div className="room-card__info">
            <span className="room-card__capacity room-card__capacity--booking">
              {capacity} гостя
            </span>
            <span className="room-card__price room-card__price--booking">
              {formatPrice(price_per_night)} / за ночь
            </span>
          </div>
        </div>
      </div>

      <div className="hotelpage__header hotelpage__header--desktop hotelpage__header--booking">
        <div className="hotelpage__info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="hotelpage__title">{hotels.name}</h1>
            <div>
              <AmenityList amenities={hotels.amenities} />
            </div>
          </div>
          <div>
            <p className="hotelpage__address">{hotels.description}</p>
            <p className="hotelpage__address">{hotels.adress}</p>
          </div>
        </div>
        <div className="hotelpage__addit">
          <div className="hotelpage__price-container">
            <span className="hotelpage__price-label">от</span>
            <span className="hotelpage__price">{formatPrice(hotels.price)}</span>
            <span className="hotelpage__price-period">/ ночь</span>
          </div>

          <div className="hotelpage__actions">
            <button className="hotelpage__button" onClick={onClick}>
              Посмотреть другие номера
            </button>
          </div>
        </div>
      </div>

      <BookingInfo city={hotels.city} searchData={searchData} daysCount={daysCount} />

      <div className="booking-content__paymant-info">
        <div className="booking-content__paymant-amount">
          <span>Предоплата составит {(daysCount / 2) * price_per_night}</span>
        </div>
      </div>
    </div>
  );
}
