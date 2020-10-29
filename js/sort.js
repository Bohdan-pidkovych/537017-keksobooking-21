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

  window.sort = {
    filterHousingType
  };
})();
