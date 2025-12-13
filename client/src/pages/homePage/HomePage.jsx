import { Header } from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
import { SearchForm } from '../../components/serachForm/SearchForm';
import { useNavigate } from 'react-router-dom';
import './homePage.scss';
import { TopHotels } from '../../components/topHotels/TopHotels';
import { useSearch } from '../../context/searchContext';

export const HomePage = () => {
  const { searchData, updateSearchData } = useSearch();

  const navigate = useNavigate();

  const handleSearch = (formData) => {
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
                    onClick={() => updateSearchData({ type })}
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

        {/* <section className="home-page__top-hotels-section">
                    <h2 className="section-title">Лучшие отели</h2>
                    <TopHotels />
                </section> */}
      </main>

      <Footer />
    </div>
  );
};
