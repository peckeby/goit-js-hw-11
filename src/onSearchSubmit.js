'use strict';
import { PixabayApi } from './pixabay-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notify } from './notify-messages';
import { observer } from './scroll-observer';
import createGalleryCards from './gallery-image-card.hbs';
import { simplelightbox } from './new-simp-lightbox';
import { refs } from './refs';

export const pixabayApi = new PixabayApi();

export const onSearchFormSubmit = async event => {
  event.preventDefault();
  pixabayApi.page = 1;
  pixabayApi.searchQuery = event.target.elements.searchQuery.value;

  try {
    const response = await pixabayApi.fetchPhotos();
    const { data } = response;
    const { hits } = data;

    if (data.totalHits === 0) {
      refs.gallery.innerHTML = "";
      Notify.failure(notify.failure)
      return;
    }

    if (data.totalHits <= 40) {
      refs.gallery.innerHTML = createGalleryCards(hits);
      Notify.success(`Hooray! We found ${data.totalHits} images`);
      simplelightbox;
      return;
    }

    refs.gallery.innerHTML = createGalleryCards(hits);
    observer.observe(refs.targetElement);
    Notify.success(`Hooray! We found ${data.totalHits} images`);
  }
    catch (err) {
    console.log(err);
  }
}