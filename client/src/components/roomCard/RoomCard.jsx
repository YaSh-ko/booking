import { formatPrice } from '../../utils/formatPrice';
import './roomCard.scss';

export const RoomCard = ({ room, onClick }) => {
  const { capacity, image_url, price_per_night, room_number, room_type } = room;

  return (
    <div className="room-card">
      <img src={image_url} alt={`Номер ${room_number}`} className="room-card__image" />

      <div className="room-card__content">
        <div className="room-card__header">
          <h3 className="room-card__title">Номер {room_number}</h3>
          <span className="room-card__type">{room_type}</span>
        </div>

        <div className="room-card__info">
          <span className="room-card__capacity">{capacity} гостя</span>
          <span className="room-card__price">
            {formatPrice(price_per_night)} / за ночь
          </span>
        </div>

        <button className="room-card__button" onClick={onClick}>
          Забронировать
        </button>
      </div>
    </div>
  );
};
