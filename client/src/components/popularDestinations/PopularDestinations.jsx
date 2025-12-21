import { useNavigate } from 'react-router-dom';
import './popularDestinations.scss';
import { useSearch } from '../../context/searchContext';

const destinations = [
  {
    id: 1,
    name: 'Казань',
    image: '/homePage/kazan.jpg',
  },
  {
    id: 2,
    name: 'Москва',
    image: '/homePage/Москва.webp',
  },
  {
    id: 3,
    name: 'Санкт-Петербург',
    image: '/homePage/peter.png',
  },
  {
    id: 4,
    name: 'Сочи',
    image: '/homePage/sochi.jpg',
  },
  {
    id: 5,
    name: 'Самара',
    image: '/homePage/Samara.jpeg',
  },
];

export const PopularDestinations = () => {
  const { searchData: contextData, updateSearchData } = useSearch();
  const navigate = useNavigate();
  const handleClick = (dest) => {
    const formData = {
      city: dest.name,
      guests: 1,
      type: 'Hotel',
    };
    const params = new URLSearchParams(formData).toString();
    updateSearchData(formData);
    navigate(`/search?${params}`);
  };
  return (
    <section className="popular-destinations">
      <div className="container">
        <div className="popular-destinations__grid">
          {destinations.map((dest, index) => (
            <article
              key={dest.id}
              onClick={() => handleClick(dest)}
              className={`popular-destinations__card popular-destinations__card--${index + 1}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="popular-destinations__image"
                loading="lazy"
              />
              <div className="popular-destinations__overlay">
                <h3 className="popular-destinations__name">{dest.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
