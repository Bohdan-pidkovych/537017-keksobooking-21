'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`, `gif`];
const PHOTO_PREVIEW_WIDTH = `70`;
const PHOTO_PREVIEW_HEIGHT = `70`;
const avatarInput = document.querySelector(`#avatar`);
const photoInput = document.querySelector(`#images`);
const avatarPreviewContainer = document.querySelector(`.ad-form-header__preview`);
const photoPreviewContainer = document.querySelector(`.ad-form__photo`);

const changeImage = (input, container) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      if (container === avatarPreviewContainer) {
        container.querySelector(`img`).src = reader.result;
      } else {
        const photoPreview = document.createElement(`img`);
        photoPreview.src = reader.result;
        photoPreview.alt = `Фото жилья`;
        photoPreview.width = PHOTO_PREVIEW_WIDTH;
        photoPreview.height = PHOTO_PREVIEW_HEIGHT;
        container.appendChild(photoPreview);
      }
    });

    reader.readAsDataURL(file);
  }
};

avatarInput.addEventListener(`change`, (() => {
  changeImage(avatarInput, avatarPreviewContainer);
}));

photoInput.addEventListener(`change`, (() => {
  changeImage(photoInput, photoPreviewContainer);
}));
