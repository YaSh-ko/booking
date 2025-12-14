import { request } from './request';

export function searchHotels(params) {
  const query = new URLSearchParams(params).toString();
  return request(`/hotels?${query}`);
}

export function getHotelDetails(id, checkIn, checkOut) {
  return request(`/hotels/details?id=${id}&checkIn=${checkIn}&checkOut=${checkOut}`);
}

export const authApi = {
  sendCode(email, name) {
    return request('/auth/send-code', {
      method: 'POST',
      body: { email, name },
    });
  },

  verifyCode(email, code) {
    return request('/auth/verify-code', {
      method: 'POST',
      body: { email, code },
    });
  },

  me() {
    return request('/auth/me');
  },
};

export const toggleFavorites = (id) => {
  return request('/favorites/toggle', {
    method: 'POST',
    body: { hotel_id: id },
  });
};

export const getFavorites = (id) => {
  if (id) return request(`/favorites/myFavorite?id=${id}`);
  return request('/favorites/myFavorite');
};

export const getHotelsByFavorites = (ids) => {
  console.log(ids);
  const promises = ids.map((id) => getHotelDetails(id.hotel_id));
  console.log(promises);
  return Promise.all(promises);
};
