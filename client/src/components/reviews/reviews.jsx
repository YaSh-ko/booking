import { useState, useEffect } from 'react';
import './reviews.scss';
import { useReviewApi } from '../../hooks/useReviews';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getReview } = useReviewApi();

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const data = await getReview(); // последние 3 отзыва
        setReviews(data || []);
      } catch (err) {
        console.error('Ошибка загрузки отзывов:', err);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestReviews();
  }, []);

  if (isLoading) {
    return <div className="reviews reviews--loading">Загрузка отзывов...</div>;
  }

  if (reviews.length === 0) {
    return <div className="reviews reviews--empty">Пока нет отзывов</div>;
  }

  return (
    <section className="reviews">
      <div className="reviews__container">
        <div className="reviews__list">
          {reviews.map((review) => (
            <div key={review.id} className="reviews__bubble">
              <div className="reviews__avatar">
                <span className="reviews__avatar-letter">
                  {review.users?.name?.[0]?.toUpperCase() || 'Г'}
                </span>
              </div>
              <div className="reviews__bubble-content">
                <h4 className="reviews__bubble-name">{review.users?.name || 'Гость'}</h4>
                <p className="reviews__bubble-hotel">
                  <strong>{review.hotels?.name}</strong>
                </p>
                <p className="reviews__bubble-text">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews__image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Путешественники в горах"
            className="reviews__image"
          />
        </div>
      </div>
    </section>
  );
};
