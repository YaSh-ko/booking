import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';

const SearchContext = createContext();

const defaultSearchData = {
  city: '',
  guests: 1,
  type: 'Hotel',
};

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(defaultSearchData);

  const updateSearchData = useCallback((newData) => {
    console.log(newData);
    setSearchData((prev) => ({ ...prev, ...newData }));
  }, []);
  return (
    <SearchContext.Provider value={{ searchData, updateSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }

  return context;
};
