'use strict';

(() => {
  const adForm = document.querySelector('.ad-form');
  const formsFieldsets = document.querySelectorAll('.map__filters select, .map__filters fieldset, .ad-form fieldset');
  const addressInput = adForm.querySelector('#address');
  const roomsInput = adForm.querySelector('#room_number');
  const capacityInput = adForm.querySelector('#capacity');
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');
  const mapPinMain = mapPins.querySelector('.map__pin--main');
  const appartmentPrice = {
    'bungalow': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const mapPinMainDefaultX = (map.clientWidth - window.constants.PIN_MAIN_WIDTH) / 2;
  const mapPinMainDefaultY = (map.clientHeight - window.constants.PIN_MAIN_HEIGHT) / 2;

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

    addressInput.value = getAdressPin(window.constants.PIN_MAIN_WIDTH / 2, window.constants.PIN_MAIN_HEIGHT / 2);
  };

  const enableForm = () => {
    adForm.classList.remove('ad-form--disabled');

    for (let i = 0; i < formsFieldsets.length; i++) {
      formsFieldsets[i].disabled = false;
    }

    addressInput.value = getAdressPin(window.constants.PIN_MAIN_WIDTH / 2, window.constants.PIN_MAIN_HEIGHT_ACTIVE);
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

  const showSuccessMessage = () => {
    document.querySelector('main').insertAdjacentElement('afterbegin', successMessage);

    document.addEventListener('click', hideSuccessMessage);
    document.addEventListener('keydown', onMessageEscPress);
  };

  const hideSuccessMessage = () => {
    successMessage.remove();

    document.removeEventListener('click', hideSuccessMessage);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  const showErrorMessage = () => {
    document.querySelector('main').insertAdjacentElement('afterbegin', errorMessage);

    errorMessage.querySelector('.error__button').addEventListener('click', hideErrorMessage);
    document.addEventListener('click', hideErrorMessage);
    document.addEventListener('keydown', onMessageEscPress);
  };

  const hideErrorMessage = () => {
    errorMessage.remove();

    errorMessage.querySelector('.error__button').removeEventListener('click', hideErrorMessage);
    document.removeEventListener('click', hideErrorMessage);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  const onMessageEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (successMessage) {
        successMessage.remove();
        document.removeEventListener('click', hideSuccessMessage);
      }
      if (errorMessage) {
        errorMessage.remove();
        document.removeEventListener('click', hideErrorMessage);
        errorMessage.querySelector('.error__button').removeEventListener('click', hideErrorMessage);
      }
      document.removeEventListener('keydown', onMessageEscPress);
    }
  };

  const onFormSuccessSubmit = () => {
    window.map.closeCard();
    window.pin.deletePins();
    map.classList.add('map--faded');
    adForm.reset();
    disableForm();
    showSuccessMessage();
    mapPinMain.style.left = mapPinMainDefaultX;
    mapPinMain.style.top = mapPinMainDefaultY;
    mapPinMain.addEventListener('mousedown', window.onPinMainClick);
    mapPinMain.addEventListener('keydown', window.onPinMainPress);
  };

  const onFormErrorSubmit = () => {
    showErrorMessage();
  };

  adForm.addEventListener('submit', (evt) => {
    window.backend.save(new FormData(adForm), onFormSuccessSubmit, onFormErrorSubmit);
    evt.preventDefault();
  });

  const buttonReset = adForm.querySelector('.ad-form__reset');
  const onButtonResetClick = (evt) => {
    evt.preventDefault();
    window.map.closeCard();
    window.pin.deletePins();
    map.classList.add('map--faded');
    adForm.reset();
    disableForm();
    mapPinMain.style.left = mapPinMainDefaultX;
    mapPinMain.style.top = mapPinMainDefaultY;
    mapPinMain.addEventListener('mousedown', window.onPinMainClick);
    mapPinMain.addEventListener('keydown', window.onPinMainPress);
    buttonReset.removeEventListener('click', onButtonResetClick);
  };

  buttonReset.addEventListener('click', onButtonResetClick);

  window.form = {
    getAdressPin,
    enableForm,
    disableForm
  };
})();
