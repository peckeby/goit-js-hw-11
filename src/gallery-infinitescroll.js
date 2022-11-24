import { simplelightbox } from './new-simp-lightbox';
import { onSearchFormSubmit } from "./onSearchSubmit";
import { refs } from "./refs"


refs.searchForm.addEventListener('submit', onSearchFormSubmit);

new MutationObserver(() => {
    onPhotoAdd();
  }).observe(refs.gallery, {subtree: true, childList: true});

function onPhotoAdd(){
  simplelightbox.refresh();
  }


