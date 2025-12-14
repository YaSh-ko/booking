import React from 'react';
import './reviews.scss';

const avatarAndrey = 'https://example.com/avatars/andrey.jpg';
const avatarAnna = 'https://example.com/avatars/anna.jpg';
const avatarVictor = 'https://example.com/avatars/victor.jpg';
const bigImage = 'https://example.com/images/traveler-mountains.jpg';

export const Reviews = () => {
  return (
    <div className="reviews">
      <div className="reviews__list">
        <div className="reviews__item">
          <img src={avatarAndrey} alt="Андрей" className="reviews__avatar" />
          <div className="reviews__content">
            <h4 className="reviews__name">Андрей</h4>
            <p className="reviews__text">
              Минус — вечером было шумно от гостей у бассейна
            </p>
          </div>
        </div>

        <div className="reviews__item">
          <img src={avatarAnna} alt="Анна" className="reviews__avatar" />
          <div className="reviews__content">
            <h4 className="reviews__name">Анна</h4>
            <p className="reviews__text">Хороший отель, удобное расположение</p>
          </div>
        </div>

        <div className="reviews__item">
          <img src={avatarVictor} alt="Виктор" className="reviews__avatar" />
          <div className="reviews__content">
            <h4 className="reviews__name">Виктор</h4>
            <p className="reviews__text">
              Отличное соотношение цены и качества. Однозначно рекомендую!
            </p>
          </div>
        </div>
      </div>

      <div className="reviews__image-wrapper">
        <img src={bigImage} alt="Путешественник в горах" className="reviews__image" />
      </div>
    </div>
  );
};
