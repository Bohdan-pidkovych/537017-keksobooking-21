'use strict';

(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');
  const mapPinMain = mapPins.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    const adForm = document.querySelector('.ad-form');
    const addressInput = adForm.querySelector('#address');

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const minCoordX = window.constants.MIN_MAP_COORD_X - window.constants.PIN_MAIN_WIDTH / 2;
      const maxCoordX = map.clientWidth - window.constants.PIN_MAIN_WIDTH / 2;
      const minCoordY = window.constants.MIN_MAP_COORD_Y - window.constants.PIN_MAIN_HEIGHT_ACTIVE;
      const maxCoordY = window.constants.MAX_MAP_COORD_Y - window.constants.PIN_MAIN_HEIGHT_ACTIVE;
      const newCoordX = mapPinMain.offsetLeft - shift.x;
      const newCoordY = mapPinMain.offsetTop - shift.y;

      if ((newCoordX >= minCoordX) && (newCoordX <= maxCoordX)) {
        mapPinMain.style.left = newCoordX + 'px';
      }

      if ((newCoordY >= minCoordY) && (newCoordY <= maxCoordY)) {
        mapPinMain.style.top = newCoordY + 'px';
      }

      addressInput.value = window.form.getAdressPin(window.constants.PIN_MAIN_WIDTH / 2, window.constants.PIN_MAIN_HEIGHT_ACTIVE);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      addressInput.value = window.form.getAdressPin(window.constants.PIN_MAIN_WIDTH / 2, window.constants.PIN_MAIN_HEIGHT_ACTIVE);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
