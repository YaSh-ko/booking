import { useState } from 'react';
import './HotelFilters.scss';

export const HotelFilters = () => {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(15000); // начальное значение выше, чтобы было видно

  const [sortPopularity, setSortPopularity] = useState(false);
  const [sortGuestRating, setSortGuestRating] = useState(false);
  const [sortPriceAsc, setSortPriceAsc] = useState(false);
  const [sortRating, setSortRating] = useState(false);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceMax - 500);
    setPriceMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceMin + 500);
    setPriceMax(value);
  };

  return (
    <div className="hotel-filters">
      <h1 className="hotel-filters__title">Все фильтры</h1>

      {/* Блок цены */}
      <div className="hotel-filters__section">
        <h2 className="hotel-filters__subtitle">Ваш бюджет (за ночь)</h2>

        <div className="price-range">
          <div className="price-range__values">
            <span>От {priceMin.toLocaleString()} ₽</span>
            <span>До {priceMax.toLocaleString()} ₽</span>
          </div>

          <div className="price-range__slider">
            {/* Серый трек */}
            <div className="price-range__track" />

            {/* Синяя полоса между ползунками */}
            <div
              className="price-range__fill"
              style={{
                left: `${(priceMin / 20000) * 100}%`,
                right: `${100 - (priceMax / 20000) * 100}%`,
              }}
            />

            {/* Два наложенных input range */}
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={priceMin}
              onChange={handleMinChange}
              className="price-range__input price-range__input--lower"
            />
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={priceMax}
              onChange={handleMaxChange}
              className="price-range__input price-range__input--upper"
            />
          </div>
        </div>
      </div>

      {/* Сортировки */}
      <div className="hotel-filters__section">
        <h2 className="hotel-filters__subtitle">Сортировки</h2>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={sortPopularity}
            onChange={(e) => setSortPopularity(e.target.checked)}
          />
          <span className="hotel-filters__checkmark" />
          По популярности
        </label>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={sortPriceAsc}
            onChange={(e) => setSortPriceAsc(e.target.checked)}
          />
          <span className="hotel-filters__checkmark" />
          По возрастанию цены
        </label>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={sortGuestRating}
            onChange={(e) => setSortGuestRating(e.target.checked)}
          />
          <span className="hotel-filters__checkmark" />
          По гостевому рейтингу
        </label>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={sortRating}
            onChange={(e) => setSortRating(e.target.checked)}
          />
          <span className="hotel-filters__checkmark" />
          По убыванию рейтинга
        </label>
      </div>
    </div>
  );
};
