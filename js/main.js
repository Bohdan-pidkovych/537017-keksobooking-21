'use strict';

const ADVERTISEMENT_INFO = {
  quantity: 8,
  avatar: ['01', '02', '03', '04', '05', '06', '07', '08'],
  title: ['Заголовок1', 'Заголовок2', 'Заголовок3', 'Заголовок4', 'Заголовок5', 'Заголовок6', 'Заголовок7', 'Заголовок8'],
  adress: ['600, 350', '610, 300', '620, 310', '630, 320', '640, 340', '600, 380', '610, 350', '690, 300'],
  price: [10, 20, 30, 40, 50, 60, 70, 80],
  type: ['palace', 'flat', 'house', 'bungalow'],
  rooms: [1, 2, 3, 4],
  guests: [1, 2, 3, 4, 5],
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7', 'Описание8'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

const map = document.querySelector('.map');
map.classList.remove('map--faded');
