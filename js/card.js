'use strict';

(() => {
  const map = document.querySelector('.map');
  const appartmentType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало'
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
      cardType.textContent = appartmentType[card.offer.type];
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
      renderPhotos(cardElement, card);
    } else {
      photos.classList.add('hidden');
    }

    if (card.offer.features) {
      renderFeatures(cardElement, card);
    } else {
      popupFeatures.classList.add('hidden');
    }

    map.insertBefore(cardElement, mapFiltersContainer);
  };

  window.card = {
    renderCard
  };
})();
