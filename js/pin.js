'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PINS_QUANTITY_MAX = 5;
const mapPins = document.querySelector(`.map__pins`);
const mapPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const render = (element) => {
  const pinElement = mapPin.cloneNode(true);

  pinElement.style.left = `${element.location.x - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${element.location.y - PIN_HEIGHT}px`;
  pinElement.querySelector(`img`).src = element.author.avatar;
  pinElement.querySelector(`img`).alt = element.offer.title;

  return pinElement;
};

const renderList = (pins) => {
  const pinFragment = document.createDocumentFragment();
  let pinsAmount = PINS_QUANTITY_MAX < pins.length ? PINS_QUANTITY_MAX : pins.length;
  for (let i = 0; i < pinsAmount; i++) {
    if (pins[i].offer) {
      pinFragment.appendChild(render(pins[i]));
    }
  }

  mapPins.appendChild(pinFragment);
};

const deleteList = () => {
  const pins = mapPins.querySelectorAll(`.map__pin`);

  pins.forEach((pin) => {
    if (!pin.classList.contains(`map__pin--main`)) {
      pin.remove();
    }
  });
};

window.pin = {
  renderList,
  deleteList
};
