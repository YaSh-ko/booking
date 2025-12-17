import { useState } from 'react';
import './HotelReviews.scss';

export const HotelReviews = ({ reviews = [], averageRating = 0, reviewsCount = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Новый отзыв:', { author, rating, text });
    setIsModalOpen(false);
    setAuthor('');
    setRating(5);
    setText('');
    alert('Спасибо за ваш отзыв!');
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
          <button className="hotel-reviews__button" onClick={() => setIsModalOpen(true)}>
            Оставить отзыв
          </button>
        </div>
      </div>

      <div className="hotel-reviews__list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="hotel-review">
              <div className="hotel-review__header">
                <div className="hotel-review__author">{review.author}</div>
                <div className="hotel-review__date">{review.date}</div>
              </div>
              <div className="hotel-review__rating">
                <span className="hotel-review__rating-score">{review.rating}</span>
              </div>
              <p className="hotel-review__text">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="hotel-reviews__empty">Пока нет отзывов. Будьте первым!</p>
        )}
      </div>

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
              <div className="form-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  placeholder="Иван Иванов"
                />
              </div>

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
                <button type="submit" className="btn-submit">
                  Отправить отзыв
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
