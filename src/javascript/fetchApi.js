'use strict';
import axios from 'axios';

export class UnsplashApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '13292952-c7bbdc2f0ed3c6a4beea574f1';
  #PER_PAGE = 40;

  constructor() {
    this.query = null;
    this.page = 100;
  }

  getPerPage() {
    return this.#PER_PAGE;
  }

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        q: this.query,
        image_type: 'photo',
        page: this.page,
        per_page: this.#PER_PAGE,
        orientation: 'horizontal',
        safesearch: true,
        key: this.#API_KEY,
      },
    });
  }

  incrementPage() {
    this.page += 1;
  }
}
