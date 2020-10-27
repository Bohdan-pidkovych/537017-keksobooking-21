'use strict';

(() => {
  const mapPins = document.querySelector('.map__pins');
  const mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  const renderPin = (element) => {
    const pinElement = mapPin.cloneNode(true);

    pinElement.style.left = `${element.location.x - window.constants.PIN_WIDTH / 2}px`;
    pinElement.style.top = `${element.location.y - window.constants.PIN_HEIGHT}px`;
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').alt = element.offer.title;

    return pinElement;
  };

  const renderPins = (pins) => {
    const pinFragment = document.createDocumentFragment();
    for (let i = 0; i < pins.length; i++) {
      if (pins[i].offer) {
        pinFragment.appendChild(renderPin(pins[i]));
      }
    }

    mapPins.appendChild(pinFragment);
  };

  window.pin = {
    renderPins
  };
})();
