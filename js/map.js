'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');

  const openCard = (pins, button) => {
    const pinsArray = mapPins.querySelectorAll('.map__pin:not(:first-of-type)');

    closeCard();
    for (let i = 0; i < pinsArray.length; i++) {
      if (pinsArray[i] === button) {
        window.card.renderCard(pins[i]);
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
      const button = mapPins.querySelector('.map__pin--active');
      button.classList.remove('map__pin--active');
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

  const onPinPress = (evt, pins) => {
    let target = evt.target;
    let button = target.closest('.map__pin');
    if (button && !button.classList.contains('map__pin--main')) {
      openCard(pins, button);
      button.classList.add('map__pin--active');
    }
  };

  const onPinMainClick = (evt) => {
    if (evt.which === 1) {
      window.page.activatePage();
    }
  };

  const onPinMainPress = (evt) => {
    if (evt.key === 'Enter') {
      window.page.activatePage();
    }
  };

  window.map = {
    closeCard,
    onPinPress,
    onPinMainClick,
    onPinMainPress
  };
})();
