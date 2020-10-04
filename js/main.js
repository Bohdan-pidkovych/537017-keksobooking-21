'use strict';

const ADVERTISEMENT_INFO = {
  quantity: 8,
  avatar: ['01', '02', '03', '04', '05', '06', '07', '08'],
  title: ['Заголовок1', 'Заголовок2', 'Заголовок3', 'Заголовок4', 'Заголовок5', 'Заголовок6', 'Заголовок7', 'Заголовок8'],
  adress: ['600, 350', '610, 300', '620, 310', '630, 320', '640, 340', '600, 380', '610, 350', '690, 300'],
  price: [10, 20, 30, 40, 50, 60, 70, 80],
  type: ['palace', 'flat', 'house', 'bungalow'],
  rooms: {
    min: 1,
    max: 5
  },
  guests: {
    min: 1,
    max: 10
  },
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7', 'Описание8'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

const map = document.querySelector('.map');
map.classList.remove('map--faded');

const mapPins = document.querySelector('.map__pins');
const mapOnePin = document.querySelector('#pin').content.querySelector('.map__pin');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const renderAdvertisement = (ADVERTISEMENT_INFO) => {
  let Advertisements = [];
  for (let i = 0; i < ADVERTISEMENT_INFO.quantity; i++) {
    Advertisements[i] = {
      author: {
        avatar: `img/avatars/user${ADVERTISEMENT_INFO.avatar[i]}.png`
      },
      offer: {
        title: ADVERTISEMENT_INFO.title[i],
        adress: ADVERTISEMENT_INFO.adress[i],
        price: ADVERTISEMENT_INFO.price[i],
        type: ADVERTISEMENT_INFO.type[getRandomInt(0, ADVERTISEMENT_INFO.type.length)], // length - 1?
        rooms: getRandomInt(ADVERTISEMENT_INFO.rooms.min, ADVERTISEMENT_INFO.rooms.max),
        guests: getRandomInt(ADVERTISEMENT_INFO.guests.min, ADVERTISEMENT_INFO.guests.max),
        checkin: ADVERTISEMENT_INFO.checkin[getRandomInt(0, ADVERTISEMENT_INFO.checkin.length)],
        checkout: ADVERTISEMENT_INFO.checkout[getRandomInt(0, ADVERTISEMENT_INFO.checkout.length)],
        features: ADVERTISEMENT_INFO.features.slice(0, getRandomInt(0, ADVERTISEMENT_INFO.features.length - 1)),
        description: ADVERTISEMENT_INFO.description[i],
        photos: ADVERTISEMENT_INFO.photos[getRandomInt(0, ADVERTISEMENT_INFO.photos.length)]
      },
      location: {
        x: getRandomInt(0, 1200), // ???
        y: getRandomInt(130, 630)
      }
    };
  }
};
