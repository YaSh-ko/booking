import { useNavigate, useParams } from 'react-router-dom';
import { useHotelDetails } from '../../hooks/useHotelDetails';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../components/loader/Loader';
import { Header } from '../../components/navbar/Navbar';
import './hotelPage.scss';
import { useToggleFavorites } from '../../hooks/useToggleFavorites';
import { Modal } from '../../components/modal/Modal';
import { formatPrice } from '../../utils/formatPrice';
import { RoomsCardsList } from '../../components/roomCardsList/RoomsCardsList';
import { getImageUrl } from '../../utils/getImageUrl';
import { useUserContext } from '../../context/userContext';
import { FavoriteButton } from '../../components/favoriteButton/FavoriteButton';
import { AmenityList } from '../../components/amenityList/AmenityList';
import { HotelReviews } from '../../components/hotelReviews/hotelReviews';
import { useFavoriteHotels } from '../../hooks/useFavoriteHotels';
import { SearchForm } from '../../components/serachForm/SearchForm';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useSearch } from '../../context/searchContext';

export function HotelPage() {
  const { id } = useParams();
  const { hotel, handleHotelDetails, isLoading } = useHotelDetails();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const [isBookingData, setIsBookimgData] = useState(Boolean(searchParams.checkIn));
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { searchData, updateSearchData } = useSearch();
  const [searchModal, setIsSearchModal] = useState(Boolean(!searchParams.checkIn));
  useEffect(() => {
    if (id) handleHotelDetails(Number(id));
    updateSearchData(searchParams);
  }, [id]);

  const handleSearch = (formData) => {
    // Создаем новые параметры URL
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests.toString(),
    }).toString();

    updateSearchData(formData);

    setIsSearchModal(false);
    setIsBookimgData(true);

    navigate(`${location.pathname}?${newSearchParams}`, { replace: true });
  };

  const hangleClickRoom = (roomId) => {
    navigate(`/hotel/booking/:${roomId}`);
  };

  useEffect(() => {
    const hasBookingData = Boolean(searchParams.checkIn);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBookimgData(hasBookingData);
  }, [location.search]);

  const liveTime = new Date(searchData.checkOut) - new Date(searchData.checkIn);
  const daysCount = Math.ceil(liveTime / (1000 * 60 * 60 * 24));

  const modalRef = useClickOutside(() => setIsSearchModal(false), searchModal);
  return (
    <div className="hotelpage">
      <Header />

      {isLoading ? (
        <div className="hotelpage__loader">
          <Loader />
        </div>
      ) : hotel ? (
        <div className="hotelpage__content main-content">
          {/* Название и адрес */}
          <div className="hotelpage__header hotelpage__header--desktop">
            <div className="hotelpage__info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 className="hotelpage__title">{hotel.name}</h1>
                <div>
                  <AmenityList amenities={hotel.amenities} />
                </div>
              </div>
              <div>
                <p className="hotelpage__address">{hotel.description}</p>
                <p className="hotelpage__address">{hotel.adress}</p>
              </div>
            </div>

            <div className="hotelpage__addit">
              <div className="hotelpage__price-container">
                <span className="hotelpage__price-label">от</span>
                <span className="hotelpage__price">{formatPrice(hotel.price)}</span>
                <span className="hotelpage__price-period">/ ночь</span>
              </div>

              <div className="hotelpage__actions">
                <FavoriteButton hotelId={hotel.id} user={user} />
                <button className="hotelpage__button">
                  <a href="#rooms">Посмотреть цены</a>
                </button>
              </div>
            </div>
          </div>

          <div className="hotelpage__header hotelpage__header--mobile">
            <div className="hotelpage__info">
              <div>
                <h1 className="hotelpage__title">{hotel.name}</h1>
              </div>
              <div>
                <p className="hotelpage__address">{hotel.description}</p>
                <p className="hotelpage__address">{hotel.adress}</p>
              </div>
              <div style={{ marginTop: '10px' }}>
                <AmenityList amenities={hotel.amenities} />
              </div>
            </div>

            <div className="hotelpage__addit--mobile">
              <div className="hotelpage__price-container">
                <span className="hotelpage__price-label">от</span>
                <span className="hotelpage__price">{formatPrice(hotel.price)}</span>
              </div>
              <div className="hotelpage__actions">
                <FavoriteButton hotelId={hotel.id} user={user} />
                <button className="hotelpage__button">
                  <a href="#rooms">Цены</a>
                </button>
              </div>
            </div>
          </div>

          {/* Картинка */}
          <div className="hotelpage__image-container">
            {getImageUrl(hotel.img, true).map((image) => (
              <div className="hotelpage__image-item">
                <img loading="lazy" src={image} />
              </div>
            ))}
          </div>

          <div className={`hotelpage__booking-info ${isBookingData ? '' : 'no-display'}`}>
            <div className="hotelpage__booking-item hotelpage__booking-item--city">
              <svg
                className="hotelpage__booking-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="30"
                height="30"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
              </svg>
              <div className="hotelpage__booking-content">
                <span className="hotelpage__booking-label">Город</span>
                <span className="hotelpage__booking-value">
                  <b>{hotel.city}</b>
                </span>
              </div>
            </div>

            <div className="hotelpage__booking-item hotelpage__booking-item--date">
              <svg
                className="hotelpage__booking-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="30"
                height="30"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
              <div className="hotelpage__booking-content">
                <span className="hotelpage__booking-label">Даты проживания</span>
                <span className="hotelpage__booking-value">
                  <b>{searchData.checkIn}</b> – <b>{searchData.checkOut}</b>
                  <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>
                    ({daysCount} суток)
                  </span>
                </span>
              </div>
            </div>

            <div className="hotelpage__booking-item hotelpage__booking-item--guests">
              <svg
                className="hotelpage__booking-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="30"
                height="30"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              <div className="hotelpage__booking-content">
                <span className="hotelpage__booking-label">Гости</span>
                <span className="hotelpage__booking-value">
                  <b>{searchData.guests}</b>{' '}
                  {searchData.guests === 1
                    ? 'гость'
                    : searchData.guests >= 2 && searchData.guests <= 4
                      ? 'гостя'
                      : 'гостей'}
                </span>
              </div>
            </div>
          </div>

          {isBookingData ? (
            <div id="rooms">
              <RoomsCardsList rooms={hotel.rooms} onClickRoom={hangleClickRoom} />
            </div>
          ) : (
            <div>
              <span>
                <button
                  onClick={() => setIsSearchModal(true)}
                  className="no-user-action no-user-action--button"
                >
                  Введите данные заезда
                </button>{' '}
                чтобы посмотреть комнаты
              </span>
            </div>
          )}

          <div id="reviews" className="hotelpage__reviews">
            <HotelReviews hotelId={id} handleClickNoUser={() => setIsModalOpen(true)} />
          </div>
        </div>
      ) : (
        <p className="hotelpage__not-found">Отель не найден</p>
      )}

      {isModalOpen && (
        <Modal
          modalType="auth"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {searchModal && (
        <div className="hotelpage__search-overlay">
          <div ref={modalRef}>
            <SearchForm
              className="hotelpage__search-form"
              onSearch={handleSearch}
              hotelName={hotel?.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}
