'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');

  const renderPins = (array) => {
    const pinFragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      pinFragment.appendChild(window.pin.renderOnePin(window.data.pinsArray[i]));
    }

    mapPins.appendChild(pinFragment);
  };

  const openCard = (src) => {
    for (let pin of window.data.pinsArray) {
      if (pin.author.avatar === src) {
        closeCard();
        window.card.renderCard(pin);
      }
    }
    const mapCard = map.querySelector('.map__card');
    mapCard.querySelector('.popup__close').addEventListener('click', () => {
      closeCard();
    });
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

  const onPinPress = (evt) => {
    let target = evt.target;
    let button = target.closest('.map__pin');
    if (button && !button.classList.contains('map__pin--main')) {
      const imageSrc = button.firstChild.getAttribute('src');
      openCard(imageSrc);
    }
  };

  const onCardEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  };

  window.map = {
    renderPins,
    openCard,
    closeCard,
    onPinPress
  };
})();
