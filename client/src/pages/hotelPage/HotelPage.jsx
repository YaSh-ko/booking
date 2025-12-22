import { useNavigate, useParams } from 'react-router-dom';
import { useHotelDetails } from '../../hooks/useHotelDetails';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../components/loader/Loader';
import { Header } from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
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
import { BookingInfo } from '../../components/bookingInfo/BookingInfo';

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
  console.log(hotel);
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
    const bookingParams = new URLSearchParams({
      checkIn: searchData.checkIn || searchParams.checkIn,
      checkOut: searchData.checkOut || searchParams.checkOut,
      guests: searchData.guests || searchParams.guests,
    }).toString();

    navigate(`/hotel/booking/${roomId}?${bookingParams}`);
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
    <div claasName="main">
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

            <div className="hotelpage__booking-info">
              <BookingInfo
                city={hotel.city}
                searchData={searchData}
                isBookingData={isBookingData}
                daysCount={daysCount}
              />
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
      <Footer />
    </div>
  );
}
