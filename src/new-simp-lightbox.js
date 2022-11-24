'use strict';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const simplelightbox =  new SimpleLightbox('.gallery .image-link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: '200ms'});