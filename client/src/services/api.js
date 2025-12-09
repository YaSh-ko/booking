import { request } from "./request";

export function searchHotels(params) {
  const query = new URLSearchParams(params).toString();
  return request(`/hotels?${query}`);
}

export const authApi = {
  sendCode(email, name) {
    return request("/auth/send-code", {
      method: "POST",
      body: { email, name },
    });
  },

  verifyCode(email, code) {
    return request("/auth/verify-code", {
      method: "POST",
      body: { email, code },
    });
  },

  me() {
    return request("/auth/me");
  }
};
