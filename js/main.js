'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

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

const dwellingType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало'
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

const renderOnePin = (element) => {
  const pinElement = mapOnePin.cloneNode(true);

  pinElement.style.left = `${element.location.x - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${element.location.y - PIN_HEIGHT}px`;
  pinElement.querySelector('img').src = element.author.avatar;
  pinElement.querySelector('img').alt = element.offer.title;

  return pinElement;
};

const renderPins = () => {
  const pinFragment = document.createDocumentFragment();
  const pinsArray = renderAdvertisements(ADVERTISEMENT_INFO);
  for (let i = 0; i < pinsArray.length; i++) {
    pinFragment.appendChild(renderOnePin(pinsArray[i]));
  }

  mapPins.appendChild(pinFragment);
};

renderPins();

const mapFiltersContainer = document.querySelector('.map__filters-container');
const mapOneCard = document.querySelector('#card').content.querySelector('.map__card');

const renderOneCard = (card) => {
  const cardElement = mapOneCard.cloneNode(true);
  const photoTemplate = cardElement.querySelector('.popup__photo');
  const photos = cardElement.querySelector('.popup__photos');
  const popupFeatures = cardElement.querySelector('.popup__features');

  if (card.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (card.offer.title) {
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (card.offer.address) {
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (card.offer.price) {
    cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price}₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (card.offer.type) {
    cardElement.querySelector('.popup__type').textContent = dwellingType[card.offer.type];
  } else {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (card.offer.rooms && card.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (card.offer.checkin && card.offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  if (card.offer.description) {
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  const renderPhotos = () => {
    for (let i = 0; i < card.offer.photos.length; i++) {
      const photo = photoTemplate.cloneNode(true);

      photo.src = card.offer.photos[i];
      photos.appendChild(photo);
    }

    photos.removeChild(photoTemplate);
  };

  if (card.offer.photos) {
    renderPhotos();
  } else {
    photos.classList.add('hidden');
  }

  const renderFeatures = () => {
    popupFeatures.innerHTML = '';

    for (let i = 0; i < card.offer.features.length; i++) {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add(`popup__feature--${card.offer.features[i]}`);
      popupFeatures.appendChild(featureItem);
    }
  };

  if (card.offer.features) {
    renderFeatures();
  } else {
    popupFeatures.classList.add('hidden');
  }

  return cardElement;
};

const renderCards = () => {
  const cards = renderAdvertisements(ADVERTISEMENT_INFO);
  const cardFragment = document.createDocumentFragment();

  cardFragment.appendChild(renderOneCard(cards[0]));

  map.insertBefore(cardFragment, mapFiltersContainer);
};

renderCards();
