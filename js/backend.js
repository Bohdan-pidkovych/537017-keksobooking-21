'use strict';

const TIMEOUT_IN_MS = 10000;

const load = (method, url, onLoad, onError, data = ``) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        onError(`Неверный запрос`);
        break;
      case 401:
        onError(`Ошибка авторизации`);
        break;
      case 403:
        onError(`Доступ запрещен`);
        break;
      case 404:
        onError(`Запрашиваемый ресурс не найден`);
        break;
      case 500:
        onError(`Внутренняя ошибка сервера`);
        break;
      default:
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);
  xhr.send(data);
};

window.backend = {
  load
};
