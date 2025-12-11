import { useState } from 'react';
import './hotelCard.scss';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import { getImageUrl } from '../../utils/getImageUrl';

export const HotelCard = ({ hotel }) => {
  const openHotel = (id) => {
    window.open(`/hotel/details/${id}`, '_blank', 'noopener,noreferrer');
  };

  console.log(getImageUrl(hotel.img));
  return (
    <div className="hotel-card hotel-card--mobile">
      <img src={getImageUrl(hotel.img)} alt="Фото отеля" loading="lazy" />

      <div className="hotel-card__desrciption">
        <div className="hotel-card__description-top">
          <h1>{hotel.name}</h1>
          <h2>{hotel.city}</h2>
        </div>

        <p>{hotel.description}</p>

        <div className="hotel-card__desrciption-bottom">
          <span className="hotel-card__price">От {formatPrice(hotel.price)}</span>
          <button onClick={() => openHotel(hotel.id)}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};
