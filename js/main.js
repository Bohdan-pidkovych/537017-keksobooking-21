'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');
  const mapPinMain = mapPins.querySelector('.map__pin--main');

  const activatePage = () => {
    map.classList.remove('map--faded');
    window.form.enableForm();
    mapPinMain.removeEventListener('mousedown', onPinMainClick);
    mapPinMain.removeEventListener('keydown', onPinMainPress);
    window.map.sendRequest();
  };

  const onPinMainClick = (evt) => {
    if (evt.which === 1) {
      activatePage();
    }
  };

  const onPinMainPress = (evt) => {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  window.form.disableForm();

  mapPinMain.addEventListener('mousedown', onPinMainClick);
  mapPinMain.addEventListener('keydown', onPinMainPress);
})();
