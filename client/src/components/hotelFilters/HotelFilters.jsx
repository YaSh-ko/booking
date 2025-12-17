import { useState } from 'react';
import './HotelFilters.scss';
import { useSearch } from '../../context/searchContext';
import { CustomSelect } from '../customSelect/CustomSelect';

export const HotelFilters = ({ filters, onPriceChange, onSortChange, placeType }) => {
  const { updateSearchData } = useSearch();

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), filters.priceMax - 500);
    onPriceChange(value, filters.priceMax);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), filters.priceMin + 500);
    onPriceChange(filters.priceMin, value);
  };

  const updateType = (value) => {
    updateSearchData({ type: value });
  };

  return (
    <div className="hotel-filters">
      <h1 className="hotel-filters__title">Все фильтры</h1>

      {/* Блок цены */}
      <div className="hotel-filters__section">
        <h2 className="hotel-filters__subtitle">Ваш бюджет (за ночь)</h2>

        <div className="price-range">
          <div className="price-range__values">
            <span>От {filters.priceMin.toLocaleString()} ₽</span>
            <span>До {filters.priceMax.toLocaleString()} ₽</span>
          </div>

          <div className="price-range__slider">
            {/* Серый трек */}
            <div className="price-range__track" />

            {/* Синяя полоса между ползунками */}
            <div
              className="price-range__fill"
              style={{
                left: `${(filters.priceMin / 20000) * 100}%`,
                right: `${100 - (filters.priceMax / 20000) * 100}%`,
              }}
            />

            {/* Два наложенных input range */}
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={filters.priceMin}
              onChange={handleMinChange}
              className="price-range__input price-range__input--lower"
            />
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={filters.priceMax}
              onChange={handleMaxChange}
              className="price-range__input price-range__input--upper"
            />
          </div>
        </div>
      </div>

      <div className="hotel-filters__section">
        <h2 className="hotel-filters__subtitle">Тип отеля</h2>
        <CustomSelect
          value={placeType}
          onChange={updateType}
          options={[
            { label: 'Отель', value: 'Hotel' },
            { label: 'Хостел', value: 'Hostel' },
            { label: 'Квартира', value: 'Apartments' },
          ]}
        />

        {/* <select
          className="hotel-filters__select"
          name="type"
          id=""
          value={placeType}
          onChange={(e) => updateSearchData({ type: e.target.value })}
        >
          <option value="Hotel">Отель</option>
          <option value="Hostel">Хостел</option>
          <option value="Apartments">Квартира</option>
        </select> */}
      </div>
      {/* Сортировки */}
      <div className="hotel-filters__section">
        <h2 className="hotel-filters__subtitle">Сортировки</h2>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={filters.sortBy === 'priceAsc'}
            onChange={(e) => onSortChange('priceAsc')}
          />
          <span className="hotel-filters__checkmark" />
          По возрастанию цены
        </label>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={filters.sortBy === 'priceDesc'}
            onChange={(e) => onSortChange('priceDesc')}
          />
          <span className="hotel-filters__checkmark" />
          По убыванию цены
        </label>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={filters.sortBy === 'ratingAsc'}
            onChange={(e) => onSortChange('ratingAsc')}
          />
          <span className="hotel-filters__checkmark" />
          По возрастанию рейтингу
        </label>

        <label className="hotel-filters__checkbox">
          <input
            type="checkbox"
            checked={filters.sortBy === 'ratingDesc'}
            onChange={(e) => onSortChange('ratingDesc')}
          />
          <span className="hotel-filters__checkmark" />
          По убыванию рейтинга
        </label>
      </div>
    </div>
  );
};
