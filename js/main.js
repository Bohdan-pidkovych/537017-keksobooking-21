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

const adForm = document.querySelector('.ad-form');
const formsFieldsets = document.querySelectorAll('.map__filters select, .map__filters fieldset, .ad-form fieldset');
const addressInput = adForm.querySelector('#address');
const roomsInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const mapPinMain = mapPins.querySelector('.map__pin--main');
const PIN_MAIN_WIDTH = 62;
const PIN_MAIN_HEIGHT = 62;
const PIN_MAIN_HEIGHT_ACTIVE = 84;

const getAdressPin = (pinWidth, pinHeight) => {
  const locationX = mapPinMain.offsetLeft + pinWidth;
  const locationY = mapPinMain.offsetTop + pinHeight;
  return `${locationX}, ${locationY}`;
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < formsFieldsets.length; i++) {
    formsFieldsets[i].disabled = true;
  }

  addressInput.value = getAdressPin(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT / 2);
};

disableForm();

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');

  for (let i = 0; i < formsFieldsets.length; i++) {
    formsFieldsets[i].disabled = false;
  }

  addressInput.value = getAdressPin(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT_ACTIVE);
  compareRoomsCapacity();
  coordinateTypePrice(typeInput, priceInput);
};

mapPinMain.addEventListener('mousedown', (evt) => {
  if (evt.which === 1) {
    map.classList.remove('map--faded');
    enableForm();
    // renderCard(pinsArray[0]);
    renderPins(pinsArray);
  }
});

mapPinMain.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    map.classList.remove('map--faded');
    enableForm();
    // renderCard(pinsArray[0]);
    renderPins(pinsArray);
  }
});

const getInputText = (select) => {
  const options = select.options;
  const selectedIndex = options.selectedIndex;
  return options[selectedIndex].textContent;
};

const compareRoomsCapacity = () => {
  if ((roomsInput.value === '100' && capacityInput.value !== '0') || (roomsInput.value !== '100' && capacityInput.value === '0')) {
    roomsInput.setCustomValidity('100 комнат - не для гостей');
  } else if (Number(roomsInput.value) < Number(capacityInput.value)) {
    roomsInput.setCustomValidity(`${getInputText(roomsInput)} — не ${getInputText(capacityInput)}. Выберите больше комнат`);
  } else if (Number(roomsInput.value) >= Number(capacityInput.value)) {
    roomsInput.setCustomValidity('');
  }
};

roomsInput.addEventListener('change', compareRoomsCapacity);

capacityInput.addEventListener('change', compareRoomsCapacity);

const openCard = (src) => {
  for (let pin of pinsArray) {
    if (pin.author.avatar === src) {
      closeCard();
      renderCard(pin);
    }
  }
  const mapCard = map.querySelector('.map__card');
  mapCard.querySelector('.popup__close').addEventListener('click', closeCard);
  document.addEventListener('keydown', onCardEscPress);
};

const closeCard = () => {
  const mapCard = map.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
    mapCard.querySelector('.popup__close').removeEventListener('click', closeCard);
    document.removeEventListener('keydown', onCardEscPress);
  }
};

const onCardEscPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCard();
  }
};

map.addEventListener('click', (evt) => {
  let target = evt.target;
  if (target.tagName === 'IMG') {
    const imageSrc = target.getAttribute('src');
    target = target.parentNode;
    openCard(imageSrc);
  }
  // if ((target.classList.contains('map__pin')) && (!target.classList.contains('map__pin--main'))) {
  //   openCard(imageSrc);
  // }
});

map.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    let target = evt.target.firstChild;
    const imageSrc = target.getAttribute('src');
    target = target.parentNode;
    openCard(imageSrc);
  }
});

const coordinateTypePrice = (select, input) => {
  const options = select.options;
  const selectedIndex = options.selectedIndex;
  const valueOption = options[selectedIndex].value;
  if (valueOption === 'bungalow') {
    input.setAttribute('placeholder', '0');
    input.setAttribute('min', '0');
  } else if (valueOption === 'flat') {
    input.setAttribute('placeholder', '1000');
    input.setAttribute('min', '1000');
  } else if (valueOption === 'house') {
    input.setAttribute('placeholder', '5000');
    input.setAttribute('min', '5000');
  } else if (valueOption === 'palace') {
    input.setAttribute('placeholder', '10000');
    input.setAttribute('min', '10000');
  }
};

const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');

typeInput.addEventListener('change', () => {
  coordinateTypePrice(typeInput, priceInput);
});

const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');

const coordinateTimeInOut = (evt) => {
  timeInInput.value = evt.target.value;
  timeOutInput.value = evt.target.value;
};

const changeTime = (evt) => {
  coordinateTimeInOut(evt);
};

timeInInput.addEventListener('change', changeTime);
timeOutInput.addEventListener('change', changeTime);
