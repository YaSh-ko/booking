import { useState } from 'react';
import { searchHotels } from '../services/api';

export const useHotelsSearch = ()=> {
  const [ hotels, setHotels ] = useState([]);

  const handleSearch = async (SearchParams) => {
    try {
      const result = await searchHotels(SearchParams);
      setHotels(result);
    }
    catch (err) {
      console.error('Ошибка поиска');
    }
  }
  return [hotels, handleSearch];
}
