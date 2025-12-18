import { Header } from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
import { SearchForm } from '../../components/serachForm/SearchForm';
import { TopHotels } from '../../components/topHotels/TopHotels';
import { PopularDestinations } from '../../components/popularDestinations/PopularDestinations';
import { Reviews } from '../../components/reviews/reviews';
import { Link, useNavigate } from 'react-router-dom';
import './homePage.scss';
import { useSearch } from '../../context/searchContext';
import { useUserContext } from '../../context/userContext';
import { useEffect, useState } from 'react';
import { Modal } from '../../components/modal/Modal';

export const HomePage = () => {
  const { searchData, updateSearchData } = useSearch();
  const { recentlyViewed, user } = useUserContext();
  const navigate = useNavigate();
  const [authModal, setAuthModal] = useState(false);

  const handleClickHotelDetails = (id) => {
    const params = new URLSearchParams({
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString(),
    }).toString();

    window.open(`/hotel/details/${id}?${params}`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => console.log(searchData), [searchData]);
  const handleSearch = (formData) => {
    console.log(formData);
    const params = new URLSearchParams({
      city: formData.city,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests.toString(),
      type: formData.type,
    }).toString();

    navigate(`/search?${params}`);
  };

  return (
    <div className="home-page">
      <Header />

      <main className="home-page__content main-content">
        <section className="home-page__search-section">
          <h1 className="visually-hidden">Найти отель</h1>

          <div className="home-page__search-container">
            <div className="home-page__search-text">
              <h2 className="home-page__search-title">ИСКАТЬ</h2>

              <div className="home-page__search-tabs">
                {['Hotel', 'Hostel', 'Apartment'].map((type) => (
                  <button
                    key={type}
                    className={
                      searchData.type === type
                        ? 'home-page__search-tab home-page__search-tab--active'
                        : 'home-page__search-tab'
                    }
                    onClick={() => updateSearchData({ type: type })}
                  >
                    {type === 'Hotel'
                      ? 'Отели'
                      : type === 'Apartment'
                        ? 'Квартиры'
                        : 'Хостелы'}
                  </button>
                ))}
              </div>
            </div>

            <SearchForm onSearch={handleSearch} className="searchForm" />
          </div>
        </section>

        <section className="home-page__top-hotels-section">
          <h2 className="section-title">Недавно просмотренные</h2>
          {user ? (
            recentlyViewed.length === 0 ? (
              <div>
                <span>
                  Перейдите на{' '}
                  <Link to="/search" className="no-user-action">
                    страницу посика
                  </Link>
                  , чтобы появились недавно просмотренные
                </span>
              </div>
            ) : (
              <TopHotels
                hotels={recentlyViewed}
                onClickDetails={handleClickHotelDetails}
              />
            )
          ) : (
            <div>
              <span>
                <button
                  className="no-user-action no-user-action--button"
                  onClick={() => setAuthModal(true)}
                >
                  Войдите
                </button>{' '}
                чтобы просматривать недавние отели
              </span>
            </div>
          )}
        </section>

        <section className="home-page__popular-destinations">
          <h2 className="section-title">Популярные напрвления</h2>
          <PopularDestinations />
        </section>

        <section className="home-page__reviews">
          <h2 className="section-title">Отзывы о нас</h2>
          <Reviews />
        </section>
      </main>

      <Footer />
      {authModal && (
        <Modal open={authModal} onClose={() => setAuthModal(false)} modalType={'auth'} />
      )}
    </div>
  );
};
