'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');

  const successHandler = (pinsArray) => {
    const pinFragment = document.createDocumentFragment();
    for (let i = 0; i < pinsArray.length; i++) {
      if (pinsArray[i].offer) {
        pinFragment.appendChild(window.pin.renderOnePin(pinsArray[i]));
      }
    }

    mapPins.appendChild(pinFragment);

    const openCard = (src) => {
      for (let pin of pinsArray) {
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

    mapPins.addEventListener('click', onPinPress);
    mapPins.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        onPinPress(evt);
      }
    });
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  const renderPins = () => {
    window.backend.load(successHandler, errorHandler);
  };

  window.map = {
    renderPins
  };
})();
