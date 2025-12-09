import { useState } from "react";
import { searchHotels } from "../services/api";
import { 
  BadRequestError, 
  NetworkError, 
  NotFoundError, 
  ServerError 
} from "../services/error";

export const useHotelsSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (params) => {
    setIsLoading(true);

    try {
      const result = await searchHotels(params);
      setHotels(result);
    } catch (err) {
      if (err instanceof BadRequestError) {
        alert("Проверьте параметры поиска");
      } else if (err instanceof NetworkError) {
        alert("Проверьте интернет-соединение");
      } else if (err instanceof NotFoundError) {
        alert("По вашему запросу ничего не найдено");
      } else if (err instanceof ServerError) {
        alert("Проблемы на сервере, попробуйте позже");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { hotels, isLoading, handleSearch };
};
