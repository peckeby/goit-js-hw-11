'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notify } from './notify-messages';
import { refs } from './refs';
import createGalleryCards from './gallery-image-card.hbs';
import { pixabayApi } from './onSearchSubmit';

export const observer = new IntersectionObserver(
  async (entries, observer) => {
    if (entries[0].isIntersecting) {
      pixabayApi.page += 1;
      try {
        const response = await pixabayApi.fetchPhotos();
        const { data } = response;
        const { hits } = data;
        refs.gallery.insertAdjacentHTML('beforeend', createGalleryCards(hits));
        console.log(data.totalHits);

        if (pixabayApi.page > Math.floor(data.totalHits / 40)) {
          observer.unobserve(refs.targetElement);
          setTimeout(() => {
            Notify.info(notify.lastPictures);
          }, 1200);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  {
    root: null,
    rootMargin: '500px',
    threshold: 1.0,
  }
);
