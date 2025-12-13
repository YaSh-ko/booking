import './hotelCard.scss';
import { formatPrice } from '../../utils/formatPrice';
import { getImageUrl } from '../../utils/getImageUrl';
import { AmenityList } from '../amenityList/AmenityList';

export const HotelCard = ({ hotel, onClickDetails }) => {
  return (
    <div className="hotel-card hotel-card--mobile">
      <img src={getImageUrl(hotel.img)} alt="Фото отеля" loading="lazy" />

      <div className="hotel-card__desrciption">
        <div className="hotel-card__description-top">
          <h1>{hotel.name}</h1>
          <h2>{hotel.city}</h2>
        </div>

        <p>{hotel.description}</p>

        <div className="hotel-card__amenity-list">
          <AmenityList amenities={hotel.amenities} />
        </div>
        <div className="hotel-card__desrciption-bottom">
          <span className="hotel-card__price">От {formatPrice(hotel.price)}</span>
          <button onClick={() => onClickDetails(hotel.id)}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};
