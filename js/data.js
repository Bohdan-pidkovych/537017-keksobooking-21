'use strict';

(() => {
  const ADVERTISEMENT_INFO = {
    quantity: 8,
    price: {
      min: 1000,
      max: 100000
    },
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
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const renderAdvertisements = (info) => {
    let advertisements = [];
    for (let i = 0; i < info.quantity; i++) {
      const locationX = getRandomInt(0, 1200);
      const locationY = getRandomInt(130, 630);
      advertisements[i] = {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`
        },
        offer: {
          title: `Заголовок-${i + 1}`,
          address: `${locationX}, ${locationY}`,
          price: getRandomInt(info.price.min, info.price.max),
          type: info.type[getRandomInt(0, info.type.length)],
          rooms: getRandomInt(info.rooms.min, info.rooms.max),
          guests: getRandomInt(info.guests.min, info.guests.max),
          checkin: info.checkin[getRandomInt(0, info.checkin.length)],
          checkout: info.checkout[getRandomInt(0, info.checkout.length)],
          features: info.features.slice(0, getRandomInt(0, info.features.length)),
          description: `Описание-${i + 1}`,
          photos: info.photos.slice(0, getRandomInt(0, info.photos.length))
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }
    return advertisements;
  };

  const pinsArray = renderAdvertisements(ADVERTISEMENT_INFO);

  window.data = {
    pinsArray
  };
})();