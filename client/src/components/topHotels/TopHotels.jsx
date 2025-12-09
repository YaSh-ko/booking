import './topHotels.scss';
import { SmallHotelCard } from '../smallHotelCard/SmallHotelCard';

export const TopHotels = () => {
  const hotels = [
    {
      id: 1,
      name: 'Hotel Moscow Palace',
      city: 'Москва',
      rating: 4.5,
      price: 4.2,
      image:
        'https://rajatourrs.com/wp-content/uploads/2022/11/pool-for-google-blog-1536x864.jpg',
    },
    {
      id: 2,
      name: 'Skyline Hotel',
      city: 'Санкт-Петербург',
      rating: 4.8,
      price: 4.8,
      image:
        'https://rajatourrs.com/wp-content/uploads/2022/11/pool-for-google-blog-1536x864.jpg',
    },
    {
      id: 3,
      name: 'Mountain View Resort',
      city: 'Сочи',
      rating: 4.7,
      price: 5.1,
      image:
        'https://rajatourrs.com/wp-content/uploads/2022/11/pool-for-google-blog-1536x864.jpg',
    },
    {
      id: 4,
      name: 'Golden Bay Hotel',
      city: 'Казань',
      rating: 4.6,
      price: 4.5,
      image:
        'https://rajatourrs.com/wp-content/uploads/2022/11/pool-for-google-blog-1536x864.jpg',
    },
    {
      id: 5,
      name: 'Golden Bay Hotel',
      city: 'Казань',
      rating: 4.6,
      price: 4.5,
      image:
        'https://rajatourrs.com/wp-content/uploads/2022/11/pool-for-google-blog-1536x864.jpg',
    },
  ];

  return (
    <div className="top-hotels">
      {hotels.map((hotel) => (
        <SmallHotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};
