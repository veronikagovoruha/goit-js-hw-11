import { UnsplashApi } from './javascript/fetchApi';
import createGalleryCards from './templates/gallery-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const unsplashApi = new UnsplashApi();

const onSearchFormSubmit = async event => {
  event.preventDefault();

  unsplashApi.query = event.currentTarget.elements['searchQuery'].value
    .trim()
    .toLowerCase();
  unsplashApi.page = 1;

  try {
    const { data } = await unsplashApi.fetchPhotos();
    await console.log(data.hits);

    if (!data.hits.length) {
      galleryListEl.innerHTML = '';
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    galleryListEl.innerHTML = createGalleryCards(data.hits);
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnElClick = async event => {
  unsplashApi.incrementPage();

  try {
    const { data } = await unsplashApi.fetchPhotos();
    galleryListEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );

    if (!data.hits.length) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
};

var lightbox = new SimpleLightbox('.gallery a', {
  // captionsData: 'alt',
  // captionDelay: 250,
});

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
