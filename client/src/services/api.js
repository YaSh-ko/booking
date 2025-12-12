import { request } from './request';

export function searchHotels(params) {
  const query = new URLSearchParams(params).toString();
  return request(`/hotels?${query}`);
}

export function getHotelDetails(id) {
  return request(`/hotels/details?id=${id}`);
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

export const getFavorites = () => {
  return request('/favorites/myFavorite');
};
