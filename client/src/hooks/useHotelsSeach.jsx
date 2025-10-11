import { useState } from 'react';
import { searchHotels } from '../services/api';
import { BadRequestError, NetworkError, NotFoundError, ServerError } from '../services/error';

export const useHotelsSearch = ()=> {
  const [ hotels, setHotels ] = useState([]);

  const handleSearch = async (SearchParams) => {
    try {
      const result = await searchHotels(SearchParams);
      setHotels(result);
    }
    catch (err) {
      if (err instanceof BadRequestError) {
        alert("Проверьте параметры поиска");
      }
      
      if (err instanceof NetworkError) {
        alert("Проверьте интернет-соединение");
      }
      
      if (err instanceof NotFoundError) {
        alert("По вашемй запросу ничего не найдено");
      }
      
      if (err instanceof ServerError) {
        alert("Проблемы на сервере, попробуйте позже");
      }
    }
  }
  return [hotels, handleSearch];
}
