export class NetworkError extends Error {
  constructor(message = "Проблемы с подключением") {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ServerError extends Error {
  constructor(message = "Ошибка сервера") {
    super(message);
    this.name = 'ServerError';
  }
}

export class BadRequestError extends Error {
  constructor(message = "Неверный запрос") {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends Error {
  constructor(resource = "ресурс", message = "Не найдено") {
    super(`${message}: ${resource}`);
    this.name = 'NotFoundError';
    this.resource = resource;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Требуется авторизация") {
    super(message);
    this.name = 'UnauthorizedError';
  }
}