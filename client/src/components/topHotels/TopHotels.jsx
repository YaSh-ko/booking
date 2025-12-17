import './topHotels.scss';
import { SmallHotelCard } from '../smallHotelCard/SmallHotelCard';

export const TopHotels = ({ hotels, onClickDetails }) => {
  return (
    <div className="top-hotels">
      {hotels.map((hotel) => (
        <SmallHotelCard key={hotel.id} hotel={hotel} onClick={onClickDetails} />
      ))}
    </div>
  );
};
