import { useState, useEffect } from 'react';
import './reviews.scss';
import { useReviewApi } from '../../hooks/useReviews';
import { useNavigate } from 'react-router-dom';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getReview } = useReviewApi();

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const data = await getReview(); // последние 3 отзыва
        console.log(data);
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
            <div
              key={review.id}
              className="reviews__bubble"
              onClick={() => navigate(`/hotel/details/${review.hotel_id}`)}
            >
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
            src="/homePage/reviews.jpg"
            alt="Путешественники в горах"
            className="reviews__image"
          />
        </div>
      </div>
    </section>
  );
};
