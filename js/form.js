'use strict';

const URL_SAVE = 'https://21.javascript.pages.academy/keksobooking';
const AppartmentPrice = {
  BUNGALOW: '0',
  FLAT: '1000',
  HOUSE: '5000',
  PALACE: '10000'
};
const mapPins = document.querySelector('.map__pins');
const mapPinMain = mapPins.querySelector('.map__pin--main');
const adForm = document.querySelector('.ad-form');
const formsFieldsets = document.querySelectorAll('.map__filters select, .map__filters fieldset, .ad-form fieldset');
const addressInput = adForm.querySelector('#address');
const roomsInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const buttonReset = adForm.querySelector('.ad-form__reset');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

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
  buttonReset.addEventListener('click', onButtonResetClick);
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
  input.setAttribute('placeholder', AppartmentPrice[valueOption.toUpperCase()]);
  input.setAttribute('min', AppartmentPrice[valueOption.toUpperCase()]);
};

typeInput.addEventListener('change', () => {
  coordinateTypePrice(typeInput, priceInput);
});

const onTimeInputChange = (evt) => {
  timeInInput.value = evt.target.value;
  timeOutInput.value = evt.target.value;
};

timeInInput.addEventListener('change', onTimeInputChange);
timeOutInput.addEventListener('change', onTimeInputChange);

const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.querySelector('main').insertAdjacentElement('afterbegin', message);
  document.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscPress);
};

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('click', hideMessage);
  document.removeEventListener('keydown', onMessageEscPress);
};

const onMessageEscPress = (evt) => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    message.remove();
    document.removeEventListener('click', hideMessage);
    document.removeEventListener('keydown', onMessageEscPress);
  }
};

const onFormSuccessSubmit = () => {
  window.page.resetPage();
  showMessage(successMessageTemplate);
};

const onFormErrorSubmit = () => {
  showMessage(errorMessageTemplate);
  const message = document.querySelector('.error');
  message.tabindex = 0;
  message.focus();
};

adForm.addEventListener('submit', (evt) => {
  window.backend.load('POST', URL_SAVE, onFormSuccessSubmit, onFormErrorSubmit, new FormData(adForm));
  evt.preventDefault();
});

const onButtonResetClick = (evt) => {
  evt.preventDefault();
  window.page.resetPage();
  buttonReset.removeEventListener('click', onButtonResetClick);
};

window.form = {
  getAdressPin,
  enableForm,
  disableForm
};
