'use strict';

const apartmentType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const map = document.querySelector(`.map`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const renderPhotos = (element, card) => {
  const photoTemplate = element.querySelector(`.popup__photo`);
  const photos = element.querySelector(`.popup__photos`);

  if (card.offer.photos) {
    for (let i = 0; i < card.offer.photos.length; i++) {
      const photo = photoTemplate.cloneNode(true);
      photo.src = card.offer.photos[i];
      photos.appendChild(photo);
    }

    photos.removeChild(photoTemplate);
  } else {
    photos.classList.add(`hidden`);
  }
};

const renderFeatures = (element, card) => {
  const popupFeatures = element.querySelector(`.popup__features`);
  popupFeatures.innerHTML = ``;

  if (card.offer.features) {
    for (let i = 0; i < card.offer.features.length; i++) {
      const featureItem = document.createElement(`li`);
      featureItem.classList.add(`popup__feature`, `popup__feature--${card.offer.features[i]}`);
      popupFeatures.appendChild(featureItem);
    }
  } else {
    popupFeatures.classList.add(`hidden`);
  }
};

const renderComponent = (component, property, value = property) => {
  if (property) {
    component.textContent = value;
  } else {
    component.classList.add(`hidden`);
  }
};

const renderItem = (card) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  const cardAvatar = cardElement.querySelector(`.popup__avatar`);
  const cardTitle = cardElement.querySelector(`.popup__title`);
  const cardAddress = cardElement.querySelector(`.popup__text--address`);
  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  const cardType = cardElement.querySelector(`.popup__type`);
  const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const cardTime = cardElement.querySelector(`.popup__text--time`);
  const cardDescription = cardElement.querySelector(`.popup__description`);

  if (card.author.avatar) {
    cardAvatar.src = card.author.avatar;
  } else {
    cardAvatar.classList.add(`hidden`);
  }

  renderComponent(cardTitle, card.offer.title);
  renderComponent(cardAddress, card.offer.address);
  renderComponent(cardPrice, card.offer.price, `${card.offer.price}₽/ночь`);
  renderComponent(cardType, card.offer.type, apartmentType[card.offer.type]);
  renderComponent(cardCapacity, card.offer.rooms && card.offer.guests, `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`);
  renderComponent(cardTime, card.offer.checkin && card.offer.checkout, `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);
  renderComponent(cardDescription, card.offer.description);

  renderPhotos(cardElement, card);
  renderFeatures(cardElement, card);

  map.insertBefore(cardElement, mapFiltersContainer);
};

window.card = {
  renderItem
};
