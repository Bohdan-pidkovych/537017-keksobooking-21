'use strict';

(() => {
  const URL_LOAD = 'https://21.javascript.pages.academy/keksobooking/data';
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');
  const mapPinMain = mapPins.querySelector('.map__pin--main');
  const adForm = document.querySelector('.ad-form');
  const mapPinMainDefaultCoords = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

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
    adForm.reset();
    mapPinMain.style.left = mapPinMainDefaultCoords.x + 'px';
    mapPinMain.style.top = mapPinMainDefaultCoords.y + 'px';
    window.form.disableForm();
    mapPinMain.addEventListener('mousedown', window.map.onPinMainClick);
    mapPinMain.addEventListener('keydown', window.map.onPinMainPress);
  };

  let pinsArray = [];

  const onDataLoadSuccess = (pins) => {
    window.pin.renderPins(pins);

    pinsArray = pins;

    mapPins.addEventListener('click', (evt) => {
      window.map.onPinPress(evt, pins);
    });
  };

  const onFilterInputChange = () => {
    window.map.closeCard();
    window.pin.deletePins();
    window.pin.renderPins(window.sort.filterHousingType(pinsArray));
  };

  const housingType = document.querySelector('#housing-type');

  housingType.addEventListener('change', onFilterInputChange);

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

  window.page = {
    activatePage,
    resetPage
  };
})();
