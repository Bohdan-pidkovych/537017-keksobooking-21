'use strict';

(() => {
  const adForm = document.querySelector('.ad-form');
  const formsFieldsets = document.querySelectorAll('.map__filters select, .map__filters fieldset, .ad-form fieldset');
  const addressInput = adForm.querySelector('#address');
  const roomsInput = adForm.querySelector('#room_number');
  const capacityInput = adForm.querySelector('#capacity');
  const mapPins = document.querySelector('.map__pins');
  const mapPinMain = mapPins.querySelector('.map__pin--main');
  const PIN_MAIN_WIDTH = 62;
  const PIN_MAIN_HEIGHT = 62;
  const PIN_MAIN_HEIGHT_ACTIVE = 84;
  const appartmentPrice = {
    'bungalow': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  const getAdressPin = (pinWidth, pinHeight) => {
    const locationX = mapPinMain.offsetLeft + pinWidth;
    const locationY = mapPinMain.offsetTop + pinHeight;
    return `${locationX}, ${locationY}`;
  };

  const disableForm = () => {
    adForm.classList.add('ad-form--disabled');

    for (let i = 0; i < formsFieldsets.length; i++) {
      formsFieldsets[i].disabled = true;
    }

    addressInput.value = getAdressPin(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT / 2);
  };

  disableForm();

  const enableForm = () => {
    adForm.classList.remove('ad-form--disabled');

    for (let i = 0; i < formsFieldsets.length; i++) {
      formsFieldsets[i].disabled = false;
    }

    addressInput.value = getAdressPin(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT_ACTIVE);
    compareRoomsCapacity();
  };

  const getInputText = (select) => {
    const options = select.options;
    const selectedIndex = options.selectedIndex;
    return options[selectedIndex].textContent;
  };

  const compareRoomsCapacity = () => {
    if ((roomsInput.value === '100' && capacityInput.value !== '0') || (roomsInput.value !== '100' && capacityInput.value === '0')) {
      roomsInput.setCustomValidity('100 комнат - не для гостей');
    } else if (Number(roomsInput.value) < Number(capacityInput.value)) {
      roomsInput.setCustomValidity(`${getInputText(roomsInput)} — не ${getInputText(capacityInput)}. Выберите больше комнат`);
    } else if (Number(roomsInput.value) >= Number(capacityInput.value)) {
      roomsInput.setCustomValidity('');
    }
  };

  roomsInput.addEventListener('change', () => {
    compareRoomsCapacity();
  });
  capacityInput.addEventListener('change', () => {
    compareRoomsCapacity();
  });

  const coordinateTypePrice = (select, input) => {
    const options = select.options;
    const selectedIndex = options.selectedIndex;
    const valueOption = options[selectedIndex].value;
    input.setAttribute('placeholder', appartmentPrice[valueOption]);
    input.setAttribute('min', appartmentPrice[valueOption]);
  };

  const typeInput = adForm.querySelector('#type');
  const priceInput = adForm.querySelector('#price');

  typeInput.addEventListener('change', () => {
    coordinateTypePrice(typeInput, priceInput);
  });

  const timeInInput = adForm.querySelector('#timein');
  const timeOutInput = adForm.querySelector('#timeout');

  const onTimeInputChange = (evt) => {
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };

  timeInInput.addEventListener('change', onTimeInputChange);
  timeOutInput.addEventListener('change', onTimeInputChange);

  window.form = {
    enableForm
  };
})();