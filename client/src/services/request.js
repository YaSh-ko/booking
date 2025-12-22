import {
  BadRequestError,
  NotFoundError,
  NetworkError,
  ServerError,
  UnauthorizedError,
} from './error';

const API_BASE_URL = 'http://localhost:3234/api';

export async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  let response;

  try {
    response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      credentials: 'include',
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new NetworkError('Нет соединения');
  }

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch (error) {
      // Если не удалось распарсить JSON, но статус OK, возвращаем null
      if (response.ok) {
        data = null;
      } else {
        // Если ошибка и не удалось распарсить, пробрасываем дальше
        data = null;
      }
    }
  } else {
    data = null;
  }

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new BadRequestError(data?.error || 'Некорректные данные');
      case 401:
        throw new UnauthorizedError(data?.error || 'Требуется авторизация');
      case 404:
        throw new NotFoundError('Не найдено');
      case 500:
      case 502:
      case 503:
        throw new ServerError('Ошибка сервера');
      default:
        throw new Error('Неизвестная ошибка');
    }
  }
  return data;
}
