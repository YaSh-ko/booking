import { useParams } from 'react-router-dom';
import { useHotelDetails } from '../../hooks/useHotelDetails';
import { useEffect, useState } from 'react';
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

export function HotelPage() {
  const { id } = useParams();
  const { hotel, handleHotelDetails, isLoading } = useHotelDetails();
  const { handleToggleFavorites, error, clearError } = useToggleFavorites();
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) handleHotelDetails(Number(id));
  }, [id]);

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
          <div className="hotelpage__header">
            <div className="hotelpage__info">
              <h1 className="hotelpage__title">{hotel.name}</h1>
              <div>
                <p className="hotelpage__address">{hotel.description}</p>
                <p className="hotelpage__address">{hotel.adress}</p>
              </div>
            </div>
            <div className="hotelpage__addit">
              <p className="hotelpage__price">от {formatPrice(hotel.price)}</p>
              <div className="hotelpage__actions">
                <FavoriteButton hotelId={hotel.id} user={user} />
                <button className="hotelpage__button">
                  <a href="#rooms">Посмотреть цены</a>
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

          {/* Данные о заезде */}
          <div className="hotelpage__booking-info">
            <div className="hotelpage__booking-item">
              <span className="hotelpage__booking-label">Дата заезда:</span>
              <span className="hotelpage__booking-value">{hotel.checkIn}</span>
            </div>
            <div className="hotelpage__booking-item">
              <span className="hotelpage__booking-label">Дата выезда:</span>
              <span className="hotelpage__booking-value">{hotel.checkOut}</span>
            </div>
            <div className="hotelpage__booking-item">
              <span className="hotelpage__booking-label">Количество гостей:</span>
              <span className="hotelpage__booking-value">{hotel.guests}</span>
            </div>
          </div>

          <div id="rooms">
            <RoomsCardsList rooms={hotel.rooms} />
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
    </div>
  );
}
