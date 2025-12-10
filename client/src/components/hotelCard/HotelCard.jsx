import { useState } from 'react';
import './hotelCard.scss';
import { useNavigate } from 'react-router-dom';

export const HotelCard = ({ hotel }) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="hotel-card hotel-card--mobile">
      <img
        src={!imgError && hotel.img ? hotel.img : '/images/placeholder-hotel-house.png'}
        alt="Фото отеля"
        loading="lazy"
        onError={() => setImgError(true)}
      />

      <div className="hotel-card__desrciption">
        <div className="hotel-card__description-top">
          <h1>{hotel.name}</h1>
          <h2>{hotel.city}</h2>
        </div>

        <p>{hotel.description}</p>

        <div className="hotel-card__desrciption-bottom">
          <span className="hotel-card__price">От {hotel.price} Р</span>
          <button onClick={() => navigate(`/hotel/details/${hotel.id}`)}>
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};
