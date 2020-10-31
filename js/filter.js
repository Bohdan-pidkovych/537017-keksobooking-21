'use strict';

(() => {
  const mapFilter = document.querySelector('.map__filters');
  const housingType = document.querySelector('#housing-type');
  const housingPrice = document.querySelector('#housing-price');
  const housingRooms = document.querySelector('#housing-rooms');
  const housingGuests = document.querySelector('#housing-guests');
  const housingFeatures = document.querySelector('#housing-features');
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  let filteredOffers = [];

  const filterType = (suggestion) => {
    if (housingType.value !== 'any') {
      return suggestion.offer.type === housingType.value;
    }
    return true;
  };

  const filterPrice = function (suggestion) {
    if (housingPrice.value === 'any') {
      return true;
    }
    if (housingPrice.value === 'low') {
      return suggestion.offer.price < LOW_PRICE;
    }
    if (housingPrice.value === 'middle') {
      return suggestion.offer.price > LOW_PRICE && suggestion.offer.price < HIGH_PRICE;
    }
    return suggestion.offer.price > HIGH_PRICE;
  };

  const filterRooms = (suggestion) => {
    if (housingRooms.value !== 'any') {
      return suggestion.offer.rooms.toString() === housingRooms.value;
    }
    return true;
  };

  const filterGuests = (suggestion) => {
    if (housingGuests.value !== 'any') {
      return suggestion.offer.guests.toString() === housingGuests.value;
    }
    return true;
  };

  const filterFeatures = (suggestion) => {
    const chosenFeatures = housingFeatures.querySelectorAll('.map__checkbox:checked');

    return Array.from(chosenFeatures).every((chosenFeature) => {
      return suggestion.offer.features.includes(chosenFeature.value);
    });
  };

  const filterOffers = (suggestions) => {
    suggestions.forEach((suggestion) => {
      if (filterType(suggestion) && filterPrice(suggestion) && filterRooms(suggestion) && filterGuests(suggestion) && filterFeatures(suggestion)) {
        filteredOffers.push(suggestion);
      }
    });
    return filteredOffers;
  };

  const onFilterInputChange = window.debounce(() => {
    window.map.closeCard();
    window.pin.deletePins();
    window.filter.filteredOffers = filterOffers(window.page.offers);
    window.pin.renderPins(window.filter.filteredOffers);
  });

  mapFilter.addEventListener('change', onFilterInputChange);

  window.filter = {
    filteredOffers
  };
})();
