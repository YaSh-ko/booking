import { useState } from 'react';
import { searchHotels } from '../services/api';
import { BadRequestError, NetworkError, NotFoundError, ServerError } from '../services/error';

export const useHotelsSearch = ()=> {
  const [ hotels, setHotels ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (SearchParams) => {
    setIsLoading(true);

    try {
      console.log('here');
      const result = await searchHotels(SearchParams);
      setIsLoading(false);
      setHotels(result);
    }
    catch (err) {
      setIsLoading(false);
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
  return {hotels, isLoading, handleSearch};
}
