'use strict';

(() => {
  const housingType = document.querySelector('#housing-type');

  const filterHousingType = (pins) => {
    let selectedType = housingType.value;

    return pins.filter((pin) => {
      if (selectedType !== 'any') {
        return pin.offer.type === selectedType;
      }
      return true;
    });
  };

  let newPinsArray = [];

  const onFilterInputChange = () => {
    window.map.closeCard();
    window.pin.deletePins();
    window.filter.newPinsArray = filterHousingType(window.page.filteredPins);
    window.pin.renderPins(window.filter.newPinsArray);

    const mapPins = document.querySelector('.map__pins');
    mapPins.addEventListener('click', (evt) => {
      window.map.onPinPress(evt, window.filter.newPinsArray);
    });
  };

  housingType.addEventListener('change', onFilterInputChange);

  window.filter = {
    newPinsArray
  };
})();
