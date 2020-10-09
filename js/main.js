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

const pinsArray = renderAdvertisements(ADVERTISEMENT_INFO);

const renderPins = (array) => {
  const pinFragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    pinFragment.appendChild(renderOnePin(pinsArray[i]));
  }

  mapPins.appendChild(pinFragment);
};

renderPins(pinsArray);

const mapFiltersContainer = document.querySelector('.map__filters-container');
const mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

const renderPhotos = (element, card) => {
  const photoTemplate = element.querySelector('.popup__photo');
  const photos = element.querySelector('.popup__photos');

  for (let i = 0; i < card.offer.photos.length; i++) {
    const photo = photoTemplate.cloneNode(true);
    photo.src = card.offer.photos[i];
    photos.appendChild(photo);
  }

  photos.removeChild(photoTemplate);
};

const renderFeatures = (element, card) => {
  const popupFeatures = element.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  for (let i = 0; i < card.offer.features.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', `popup__feature--${card.offer.features[i]}`);
    popupFeatures.appendChild(featureItem);
  }
};

const renderCard = (card) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  const photos = cardElement.querySelector('.popup__photos');
  const popupFeatures = cardElement.querySelector('.popup__features');
  const cardAvatar = cardElement.querySelector('.popup__avatar');
  const cardTitle = cardElement.querySelector('.popup__title');
  const cardAddress = cardElement.querySelector('.popup__text--address');
  const cardPrice = cardElement.querySelector('.popup__text--price');
  const cardType = cardElement.querySelector('.popup__type');
  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  const cardTime = cardElement.querySelector('.popup__text--time');
  const cardDescription = cardElement.querySelector('.popup__description');

  if (card.author.avatar) {
    cardAvatar.src = card.author.avatar;
  } else {
    cardAvatar.classList.add('hidden');
  }

  if (card.offer.title) {
    cardTitle.textContent = card.offer.title;
  } else {
    cardTitle.classList.add('hidden');
  }

  if (card.offer.address) {
    cardAddress.textContent = card.offer.address;
  } else {
    cardAddress.classList.add('hidden');
  }

  if (card.offer.price) {
    cardPrice.textContent = `${card.offer.price}₽/ночь`;
  } else {
    cardPrice.classList.add('hidden');
  }

  if (card.offer.type) {
    cardType.textContent = dwellingType[card.offer.type];
  } else {
    cardType.classList.add('hidden');
  }

  if (card.offer.rooms && card.offer.guests) {
    cardCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  } else {
    cardCapacity.classList.add('hidden');
  }

  if (card.offer.checkin && card.offer.checkout) {
    cardTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  } else {
    cardTime.classList.add('hidden');
  }

  if (card.offer.description) {
    cardDescription.textContent = card.offer.description;
  } else {
    cardDescription.classList.add('hidden');
  }

  if (card.offer.photos) {
    renderPhotos(cardElement, pinsArray[0]);
  } else {
    photos.classList.add('hidden');
  }

  if (card.offer.features) {
    renderFeatures(cardElement, pinsArray[0]);
  } else {
    popupFeatures.classList.add('hidden');
  }

  map.insertBefore(cardElement, mapFiltersContainer);
};

renderCard(pinsArray[0]);
