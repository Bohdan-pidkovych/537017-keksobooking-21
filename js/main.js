'use strict';

(() => {
  const mapPins = document.querySelector('.map__pins');
  const mapPinMain = mapPins.querySelector('.map__pin--main');

  window.form.disableForm();

  mapPinMain.addEventListener('mousedown', window.map.onPinMainClick);
  mapPinMain.addEventListener('keydown', window.map.onPinMainPress);
})();
