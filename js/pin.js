'use strict';

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const mapOnePin = document.querySelector('#pin').content.querySelector('.map__pin');

  const renderOnePin = (element) => {
    const pinElement = mapOnePin.cloneNode(true);

    pinElement.style.left = `${element.location.x - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${element.location.y - PIN_HEIGHT}px`;
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').alt = element.offer.title;

    return pinElement;
  };

  window.pin = {
    renderOnePin
  };
})();
