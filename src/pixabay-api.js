'use strict';

import axios from 'axios';


export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '31557742-046ac504811e73e74d3b06594';

  constructor() {
    this.page = null;
    this.searchQuery = null;
  }

  fetchPhotos() {
    const searchParams = {
      params: {
        key: this.#API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    };

    return axios.get(`${this.#BASE_URL}/`, searchParams);
  }
}