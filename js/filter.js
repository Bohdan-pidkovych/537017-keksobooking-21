'use strict';

(() => {
  const housingType = document.querySelector('#housing-type');
  let filteredOffers = [];

  const filterHousingType = (pins) => {
    let selectedType = housingType.value;

    return pins.filter((pin) => {
      if (selectedType !== 'any') {
        return pin.offer.type === selectedType;
      }
      return true;
    });
  };

  const onFilterInputChange = () => {
    window.map.closeCard();
    window.pin.deletePins();
    window.filter.filteredOffers = filterHousingType(window.page.offers);
    window.pin.renderPins(window.filter.filteredOffers);
  };

  housingType.addEventListener('change', onFilterInputChange);

  window.filter = {
    filteredOffers
  };
})();
