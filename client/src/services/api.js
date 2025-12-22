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
    if (hotel_id) {
      return request(`/reviews/getReview?hotel_id=${hotel_id}`);
    } else {
      return request('/reviews/getReview'); // ← без параметра — последние 3 отзыва
    }
  },
};

export function getRoomDetails(roomId) {
  return request(`/hotels/RoomDetails?room_id=${roomId}`);
}

export const bookingApi = {
  createBooking(roomId, checkIn, checkOut) {
    return request('/booking/', {
      method: 'POST',
      body: { room_id: roomId, check_in: checkIn, check_out: checkOut },
    });
  },
  myBookings() {
    return request('/booking/myBookings');
  },
};
