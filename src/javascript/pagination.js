'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { UnsplashApi } from './javascript/fetchApi';
import createGalleryCards from './templates/gallery-card.hbs';

const postsWrapperEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const unsplashApi = new UnsplashApi();

unsplashApi.fetchPosts().then(data => {
  postsWrapperEl.innerHTML = createGalleryCards(data.hits);
});

const onLoadMoreBtnElClick = event => {
  unsplashApi.incrementPage();

  unsplashApi.fetchPosts().then(data => {
    postsWrapperEl.insertAdjacentHTML('beforeend', createPostsCards(data));

    console.log(unsplashApi.page);
    console.log(unsplashApi.total_pages);
    if (unsplashApi.page === unsplashApi.total_pages) {
      event.target.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  });
};

loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
