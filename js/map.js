'use strict';

const MOUSE_BUTTON_LEFT = 1;
const ENTER_BUTTON = `Enter`;
const ESCAPE_BUTTON = `Escape`;
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);

const openCard = (pins, button) => {
  const advertPins = mapPins.querySelectorAll(`.map__pin:not(:first-of-type)`);

  closeCard();
  advertPins.forEach((pin, i) => {
    if (pin === button) {
      window.card.renderItem(pins[i]);
    }
  });

  const mapCard = map.querySelector(`.map__card`);
  mapCard.querySelector(`.popup__close`).addEventListener(`click`, () => {
    closeCard();
  });
  document.addEventListener(`keydown`, onCardEscPress);
};

const closeCard = () => {
  const mapCard = map.querySelector(`.map__card`);
  if (mapCard) {
    mapCard.remove();
    const button = mapPins.querySelector(`.map__pin--active`);
    button.classList.remove(`map__pin--active`);
    mapCard.querySelector(`.popup__close`).removeEventListener(`click`, closeCard);
    document.removeEventListener(`keydown`, onCardEscPress);
  }
};

const onCardEscPress = (evt) => {
  if (evt.key === ESCAPE_BUTTON) {
    evt.preventDefault();
    closeCard();
  }
};

const onPinPress = (evt) => {
  let target = evt.target;
  let button = target.closest(`.map__pin`);
  if (button && !button.classList.contains(`map__pin--main`)) {
    openCard(window.filter.ads, button);
    button.classList.add(`map__pin--active`);
  }
};

const onPinMainClick = (evt) => {
  if (evt.which === MOUSE_BUTTON_LEFT) {
    window.page.activate();
  }
};

const onPinMainPress = (evt) => {
  if (evt.key === ENTER_BUTTON) {
    window.page.activate();
  }
};

mapPinMain.addEventListener(`mousedown`, onPinMainClick);
mapPinMain.addEventListener(`keydown`, onPinMainPress);

window.map = {
  closeCard,
  onPinPress,
  onPinMainClick,
  onPinMainPress
};
