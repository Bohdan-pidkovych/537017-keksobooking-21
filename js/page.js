'use strict';

const URL_LOAD = 'https://21.javascript.pages.academy/keksobooking/data';
const map = document.querySelector('.map');
const mapPins = document.querySelector('.map__pins');
const mapPinMain = mapPins.querySelector('.map__pin--main');
const adForm = document.querySelector('.ad-form');
const mapFilter = map.querySelector('.map__filters');
const mapPinMainDefaultCoords = {
  x: mapPinMain.offsetLeft,
  y: mapPinMain.offsetTop
};
let offers = [];

const activatePage = () => {
  map.classList.remove('map--faded');
  window.form.enableForm();
  mapPinMain.removeEventListener('mousedown', window.map.onPinMainClick);
  mapPinMain.removeEventListener('keydown', window.map.onPinMainPress);
  window.backend.load('GET', URL_LOAD, onDataLoadSuccess, onDataLoadError);
};

const resetPage = () => {
  window.map.closeCard();
  window.pin.deletePins();
  map.classList.add('map--faded');
  mapFilter.reset();
  adForm.reset();
  mapPinMain.style.left = mapPinMainDefaultCoords.x + 'px';
  mapPinMain.style.top = mapPinMainDefaultCoords.y + 'px';
  window.form.disableForm();
  mapPinMain.addEventListener('mousedown', window.map.onPinMainClick);
  mapPinMain.addEventListener('keydown', window.map.onPinMainPress);
  mapPins.removeEventListener('click', window.map.onPinPress);
};

const onDataLoadSuccess = (data) => {
  window.pin.renderPins(data);
  window.page.offers = data;
  window.filter.filteredOffers = data;
  mapPins.addEventListener('click', window.map.onPinPress);
};

const onDataLoadError = (errorMessage) => {
  const node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';
  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};

window.page = {
  activatePage,
  resetPage,
  offers
};
