'use strict';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const OptionValue = {
  ANY: `any`,
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};
const mapFilter = document.querySelector(`.map__filters`);
const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);
const housingFeatures = document.querySelector(`#housing-features`);
let ads = [];

const filterType = (advert) => {
  return housingType.value !== OptionValue.ANY ? advert.offer.type === housingType.value : true;
};

const filterPrice = (advert) => {
  switch (housingPrice.value) {
    case OptionValue.ANY:
      return true;
    case OptionValue.LOW:
      return advert.offer.price < LOW_PRICE;
    case OptionValue.MIDDLE:
      return advert.offer.price >= LOW_PRICE && advert.offer.price <= HIGH_PRICE;
    case OptionValue.HIGH:
      return advert.offer.price > HIGH_PRICE;
    default:
      return false;
  }
};

const filterRooms = (advert) => {
  return housingRooms.value !== OptionValue.ANY ? advert.offer.rooms.toString() === housingRooms.value : true;
};

const filterGuests = (advert) => {
  return housingGuests.value !== OptionValue.ANY ? advert.offer.guests.toString() === housingGuests.value : true;
};

const filterFeatures = (advert) => {
  const chosenFeatures = housingFeatures.querySelectorAll(`.map__checkbox:checked`);

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
  window.pin.deleteList();
  window.filter.ads = filterOffers(window.page.offers);
  window.pin.renderList(window.filter.ads);
};

mapFilter.addEventListener(`change`, window.debounce(onFilterInputChange));

window.filter = {
  ads
};
