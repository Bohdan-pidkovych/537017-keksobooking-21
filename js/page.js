'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const mapFilter = map.querySelector(`.map__filters`);
const defaultAvatar = adForm.querySelector(`.ad-form-header__preview img`).src;
const mapPinMainDefaultCoords = {
  x: mapPinMain.offsetLeft,
  y: mapPinMain.offsetTop
};
let offers = [];

const activate = () => {
  map.classList.remove(`map--faded`);
  window.form.enable();
  mapPinMain.removeEventListener(`mousedown`, window.map.onPinMainClick);
  mapPinMain.removeEventListener(`keydown`, window.map.onPinMainPress);
  window.backend.load(`GET`, URL_LOAD, onDataLoadSuccess, onDataLoadError);
};

const reset = () => {
  window.map.closeCard();
  window.pin.deleteList();
  map.classList.add(`map--faded`);
  mapFilter.reset();
  adForm.reset();
  adForm.querySelector(`.ad-form-header__preview img`).src = defaultAvatar;
  adForm.querySelector(`.ad-form__photo`).innerHTML = ``;
  mapPinMain.style.left = mapPinMainDefaultCoords.x + `px`;
  mapPinMain.style.top = mapPinMainDefaultCoords.y + `px`;
  window.form.disable();
  mapPinMain.addEventListener(`mousedown`, window.map.onPinMainClick);
  mapPinMain.addEventListener(`keydown`, window.map.onPinMainPress);
  mapPins.removeEventListener(`click`, window.map.onPinPress);
};

const onDataLoadSuccess = (data) => {
  window.pin.renderList(data);
  window.page.offers = data;
  window.filter.ads = data;
  mapPins.addEventListener(`click`, window.map.onPinPress);
};

const onDataLoadError = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.page = {
  activate,
  reset,
  offers
};
