'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');
  const mapPinMain = mapPins.querySelector('.map__pin--main');

  const activatePage = () => {
    map.classList.remove('map--faded');
    window.form.enableForm();
    mapPinMain.removeEventListener('mousedown', window.onPinMainClick);
    mapPinMain.removeEventListener('keydown', window.onPinMainPress);
    window.map.sendRequest();
  };

  window.onPinMainClick = (evt) => {
    if (evt.which === 1) {
      activatePage();
    }
  };

  window.onPinMainPress = (evt) => {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  window.form.disableForm();

  mapPinMain.addEventListener('mousedown', window.onPinMainClick);
  mapPinMain.addEventListener('keydown', window.onPinMainPress);
})();
