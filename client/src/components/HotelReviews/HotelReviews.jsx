import { useState, useEffect } from 'react';
import './HotelReviews.scss';
import { useReviewApi } from '../../hooks/useReviews';
import { useUserContext } from '../../context/userContext';

export const HotelReviews = ({ hotelId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const { addReview, getReview, isLoading, error, clearError } = useReviewApi();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!hotelId) return;

      try {
        const data = await getReview(hotelId);
        setReviews(data || []);

        if (data && data.length > 0) {
          const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
          setAverageRating(Math.round(avg * 10) / 10);
          setReviewsCount(data.length);
        } else {
          setAverageRating(0);
          setReviewsCount(0);
        }
      } catch (err) {
        setReviews([]);
        setAverageRating(0);
        setReviewsCount(0);
      }
    };

    fetchReviews();
  }, [hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!hotelId) {
      alert('Ошибка: неизвестный отель');
      return;
    }

    try {
      await addReview(hotelId, rating, text.trim());

      alert('Спасибо за отзыв!');

      setIsModalOpen(false);
      setRating(5);
      setText('');

      const data = await getReview(hotelId);
      setReviews(data || []);
      if (data && data.length > 0) {
        const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
        setReviewsCount(data.length);
      } else {
        setAverageRating(0);
        setReviewsCount(0);
      }
    } catch (err) {
      // Ошибка уже в error от хука
    }
  };

  return (
    <section className="hotel-reviews">
      <div className="hotel-reviews__header">
        <h2 className="hotel-reviews__title">Отзывы гостей</h2>
        <div className="hotel-reviews__summary">
          {averageRating > 0 && (
            <div className="hotel-reviews__rating">
              <span className="hotel-reviews__rating-score">
                {averageRating.toFixed(1)}
              </span>
              <span className="hotel-reviews__rating-text">
                {averageRating >= 4.5
                  ? 'Превосходно'
                  : averageRating >= 4
                    ? 'Очень хорошо'
                    : averageRating >= 3
                      ? 'Хорошо'
                      : averageRating >= 2
                        ? 'Нормально'
                        : 'Ниже среднего'}
              </span>
              <span className="hotel-reviews__reviews-count">{reviewsCount} отзывов</span>
            </div>
          )}
          <button className="hotel-reviews__add-btn" onClick={() => setIsModalOpen(true)}>
            Оставить отзыв
          </button>
        </div>
      </div>

      <div className="hotel-reviews__list">
        {isLoading ? (
          <p>Загрузка отзывов...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="hotel-review">
              <div className="hotel-review__header">
                <div className="hotel-review__author">
                  Пользователь {review.users.name}
                </div>
                <div className="hotel-review__date">
                  {new Date(review.created_at).toLocaleDateString('ru-RU')}
                </div>
              </div>
              <div className="hotel-review__rating">
                <span className="hotel-review__rating-score">{review.rating}</span>
              </div>
              <p className="hotel-review__text">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="hotel-reviews__empty">Пока нет отзывов. Будьте первым!</p>
        )}
      </div>

      {error && <p className="hotel-reviews__error">{error}</p>}

      {isModalOpen && (
        <div className="reviews-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="reviews-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reviews-modal__header">
              <h3>Оставить отзыв</h3>
              <button
                className="reviews-modal__close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="reviews-modal__form">
              <div className="form-group rating-stars">
                <label>Оценка</label>
                <div className="stars">
                  {[5, 4, 3, 2, 1].map((value) => (
                    <label key={value} className="star-label">
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={rating === value}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="star-input"
                      />
                      <span className="star">★</span>
                      <span className="star-count">{value}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Ваш отзыв</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  rows="6"
                  placeholder="Расскажите о вашем пребывании..."
                />
              </div>

              <div className="reviews-modal__actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Отмена
                </button>
                <button type="submit" className="btn-submit" disabled={isLoading}>
                  {isLoading ? 'Отправка...' : 'Отправить отзыв'}
                </button>
              </div>

              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
