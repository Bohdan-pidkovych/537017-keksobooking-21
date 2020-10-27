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

  const onDataLoadSuccess = (pins) => {
    window.pin.renderPins(pins);

    mapPins.addEventListener('click', (evt) => {
      onPinPress(evt, pins);
    });
  };

  const onDataLoadError = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  const sendRequest = () => {
    window.backend.load(onDataLoadSuccess, onDataLoadError);
  };

  window.map = {
    sendRequest
  };
})();
