import { useLocation, useNavigate } from 'react-router-dom';
import { useHotelsSearch } from '../../hooks/useHotelsSeach';
import { useEffect, useState } from 'react';
import { SearchForm } from '../../components/serachForm/SearchForm';
import { Header } from '../../components/navbar/Navbar';
import './hotelsListPage.scss';
import { HotelCard } from '../../components/hotelCard/HotelCard';
import { Loader } from '../../components/loader/Loader';
import { useSearch } from '../../context/searchContext';
import { HotelFilters } from '../../components/hotelFilters/HotelFilters';
import { useFilters } from '../../hooks/useFilters';
import { filterHotels } from '../../utils/filterHotels';
import { useUserContext } from '../../context/userContext';

export const HotelsListPage = () => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const { hotels, isLoading, handleSearch } = useHotelsSearch();
  const { addToRecentlyViewed } = useUserContext();
  const { filters, updatePriceRangs, updateSort } = useFilters();
  const { searchData } = useSearch();
  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      handleSearch(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearchChange = (newParams) => {
    handleSearch(newParams);
  };

  const handleClickHotelDetails = (id) => {
    const hotel = hotels.find((h) => h.id === id);
    const params = new URLSearchParams({
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString(),
    }).toString();

    addToRecentlyViewed(hotel);
    window.open(`/hotel/details/${id}?${params}`, '_blank', 'noopener,noreferrer');
  };
  const filteredHotels = filterHotels(hotels, filters);

  return (
    <div className="hotels-list-page_container">
      <Header />
      <main>
        <div className="filters-bar">
          <HotelFilters
            filters={filters}
            onPriceChange={updatePriceRangs}
            onSortChange={updateSort}
          />
        </div>
        <div className="content">
          <SearchForm onSearch={handleSearchChange} className="search-form" />

          {isLoading ? (
            <div className="hotels-search_loader">
              <Loader />
            </div>
          ) : hotels.length === 0 ? ( // ← убрали лишние {}
            <div>
              <span>Введите параметры</span>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div>
              <span>Выберите другие фильтры</span>
            </div>
          ) : (
            <div className="hotels-list">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onClickDetails={handleClickHotelDetails}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
