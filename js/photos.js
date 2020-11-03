'use strict';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const avatarInput = document.querySelector('#avatar');
const photoInput = document.querySelector('#images');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview');
const photoPreviewContainer = document.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', (() => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreviewContainer.querySelector('img').src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}));

photoInput.addEventListener('change', (() => {
  const file = photoInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const photoPreview = document.createElement('img');
      photoPreview.src = reader.result;
      photoPreview.width = '70';
      photoPreview.height = '70';
      photoPreviewContainer.appendChild(photoPreview);
    });

    reader.readAsDataURL(file);
  }
}));
