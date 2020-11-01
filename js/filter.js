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

  const filterType = (advert) => {
    return (housingType.value !== 'any') ? advert.offer.type === housingType.value : true;
  };

  const filterPrice = (advert) => {
    switch (housingPrice.value) {
      case 'any':
        return true;
      case 'low':
        return advert.offer.price < LOW_PRICE;
      case 'middle':
        return advert.offer.price >= LOW_PRICE && advert.offer.price <= HIGH_PRICE;
      case 'high':
        return advert.offer.price > HIGH_PRICE;
      default:
        return false;
    }
  };

  const filterRooms = (advert) => {
    return (housingRooms.value !== 'any') ? advert.offer.rooms.toString() === housingRooms.value : true;
  };

  const filterGuests = (advert) => {
    return (housingGuests.value !== 'any') ? advert.offer.guests.toString() === housingGuests.value : true;
  };

  const filterFeatures = (advert) => {
    const chosenFeatures = housingFeatures.querySelectorAll('.map__checkbox:checked');

    return Array.from(chosenFeatures).every((chosenFeature) => {
      return advert.offer.features.includes(chosenFeature.value);
    });
  };

  const filterOffers = (adverts) => {
    return adverts.filter((advert) => {
      return filterType(advert) && filterPrice(advert) && filterRooms(advert) && filterGuests(advert) && filterFeatures(advert);
    });
  };

  const onFilterInputChange = () => {
    window.map.closeCard();
    window.pin.deletePins();
    window.filter.filteredOffers = filterOffers(window.page.offers);
    window.pin.renderPins(window.filter.filteredOffers);
  };

  mapFilter.addEventListener('change', window.debounce(onFilterInputChange));

  window.filter = {
    filteredOffers
  };
})();
