import { BadRequestError, NotFoundError, ServerError, NetworkError } from './error.js';
const API_BASE_URL = 'http://localhost:3234/api'

export const searchHotels = async (searchParams) => {
    try {
        const urlParams = new URLSearchParams({
            city: searchParams.city || '',
            checkIn: searchParams.checkIn || '',
            checkOut: searchParams.checkOut || '',
            guests: searchParams.guests || 1,
            type: searchParams.type || 'hotel'
        })
        const url = `${API_BASE_URL}/hotels?${urlParams}`;
        const response = await fetch(url);
        if(!response.ok) {

          switch(response.status) {
            case 400: 
              throw new BadRequestError("неверные параметры поиска");
  
            case 500:
              throw new ServerError("Внутренняя ошибка сервера");
            
            default:
              if(response.status >= 500) {
                throw new ServerError(`Ошибка сервера: ${response.status}`)
              } else {
                throw new Error("Ошибка");
              }

          }
        }

        const data = await response.json();
        if(Array.isArray(data) && data.length === 0) {
          throw new NotFoundError("отели", "Отели не найдены");
        }
        return data;
    }
    catch (error) {

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new NetworkError("Нет соединения с сервером");
      }

      throw error;
    }
}