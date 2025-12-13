import { createContext, useCallback, useContext, useState } from 'react';

const SearchContext = createContext();
const defaultSearchData = {
  city: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  type: 'Hotel',
};
export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(defaultSearchData);

  const updateSearchData = useCallback((newData) => {
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
