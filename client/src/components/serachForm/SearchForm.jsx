import { useEffect, useState } from 'react';
import './searchForm.scss';
import { useSearch } from '../../context/searchContext';

export const SearchForm = ({ onSearch }) => {
  const { searchData: contextData, updateSearchData } = useSearch();
  console.log(contextData);
  const [formData, setFormData] = useState({
    city: contextData?.city || '',
    checkIn: contextData?.checkIn || '',
    checkOut: contextData?.checkOut || '',
    guests: contextData?.guests || 1,
    type: contextData?.placeType || 'Hotel',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.city.trim()) {
      alert('Введите город для поиска');
      return;
    }

    updateSearchData(formData);

    if (onSearch) {
      await onSearch(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-form__group search-form__group-city">
        <label className="search-form__label" htmlFor="cityValue">
          Город
        </label>
        <input
          type="text"
          name="city"
          className="search-form__input"
          id="cityValue"
          placeholder="Введите город"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="search-form__group search-form__group-checkin">
        <label className="search-form__label" htmlFor="checkInValue">
          Заезд
        </label>
        <input
          type="date"
          name="checkIn"
          id="checkInValue"
          className="search-form__input"
          placeholder="Заезд"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="search-form__group search-form__group-checkout">
        <label className="search-form__label" htmlFor="checkOutValue">
          Выезд
        </label>
        <input
          type="date"
          name="checkOut"
          className="search-form__input"
          id="checkOutValue"
          placeholder="Выезд"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />
      </div>

      <div className="search-form__group search-form__group-guests">
        <label className="search-form__label" htmlFor="guestsValue">
          Гости
        </label>
        <input
          type="number"
          name="guests"
          className="search-form__input"
          id="guestsValue"
          placeholder="Введите количество гостей"
          value={formData.guests}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="search-form__button">
        Найти
      </button>
    </form>
  );
};
