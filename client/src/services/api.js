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

  logout() {
    return request('/auth/logout', {
      method: 'POST',
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

export const checkFavorites = (id) => {
  return request(`/favorites/myFavorite?id=${id}`);
};

export const getFavorites = () => {
  return request('/favorites/GetFavorite');
};

export const reviewApi = {
  addReview(hotel_id, rating, comment) {
    return request('/reviews/addReview', {
      method: 'POST',
      body: { hotel_id, rating, comment },
    });
  },

  deleteReview(hotel_id) {
    return request('/reviews/deleteReview', {
      method: 'POST',
      body: { hotel_id },
    });
  },

  getReview(hotel_id) {
    return request(`/reviews/getReview?hotel_id=${hotel_id}`);
  },
};
