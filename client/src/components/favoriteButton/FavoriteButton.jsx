import { useState, useEffect } from 'react';
import { useToggleFavorites } from '../../hooks/useToggleFavorites';
import { Modal } from '../modal/Modal';
import './favoriteButton.scss';

export const FavoriteButton = ({ hotelId, user, initialIsFavorite = false }) => {
  const { handleToggleFavorites, error } = useToggleFavorites();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showAuthModal, setShowAuthModal] = useState(false);
  console.log('here');
  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const handleClick = async () => {
    console.log(user);
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const oldState = isFavorite;

      setIsFavorite(!oldState);

      await handleToggleFavorites(hotelId);
    } catch (err) {
      setIsFavorite(isFavorite);
      console.error('Ошибка при изменении избранного:', err);
    }
  };

  return (
    <>
      <div className="favorite-button-wrapper">
        <button
          className={`favorite-button  ${isFavorite ? 'favorite-button--active' : ''}`}
          onClick={handleClick}
          aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isFavorite ? (
              <path
                d="M12 4.419C9.437 2.042 6.222 2.11 4.031 3.281C1.84 4.452 0.75 6.905 0.75 9.137C0.75 12.371 2.868 14.836 5.789 17.828C7.406 19.366 9.25 20.882 10.871 21.957C11.28 22.214 12 21.85 12 21.85C12 21.85 12.72 22.214 13.129 21.957C14.75 20.882 16.594 19.366 18.211 17.828C21.132 14.836 23.25 12.371 23.25 9.137C23.25 6.905 22.16 4.452 19.969 3.281C17.778 2.11 14.563 2.042 12 4.419Z"
                fill="#1C274C"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M5.62436 4.4241C3.96537 5.18243 2.75 6.98614 2.75 9.13701C2.75 11.3344 3.64922 13.0281 4.93829 14.4797C6.00072 15.676 7.28684 16.6675 8.54113 17.6345C8.83904 17.8642 9.13515 18.0925 9.42605 18.3218C9.95208 18.7365 10.4213 19.1004 10.8736 19.3647C11.3261 19.6292 11.6904 19.7499 12 19.7499C12.3096 19.7499 12.6739 19.6292 13.1264 19.3647C13.5787 19.1004 14.0479 18.7365 14.574 18.3218C14.8649 18.0925 15.161 17.8642 15.4589 17.6345C16.7132 16.6675 17.9993 15.676 19.0617 14.4797C20.3508 13.0281 21.25 11.3344 21.25 9.13701C21.25 6.98614 20.0346 5.18243 18.3756 4.4241C16.7639 3.68739 14.5983 3.88249 12.5404 6.02065C12.399 6.16754 12.2039 6.25054 12 6.25054C11.7961 6.25054 11.601 6.16754 11.4596 6.02065C9.40166 3.88249 7.23607 3.68739 5.62436 4.4241Z"
                fill="none"
                stroke="#1C274C"
                strokeWidth="1.5"
              />
            )}
          </svg>
        </button>
      </div>

      {showAuthModal && (
        <Modal
          open={showAuthModal}
          modalType="auth"
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};
