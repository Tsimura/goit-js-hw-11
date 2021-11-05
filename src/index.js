import imagesCardsTpl from './templates/images-card.hbs';
import './css/styles.css';
import ImagesApiService from './js/images-servise';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};
const imagesApiService = new ImagesApiService();
// console.log(refs.searchForm);
// console.log(refs.gallery);
// console.log(refs.btnLoadMpre);

refs.searchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  imagesApiService.query = event.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(images => {
    clearImagesGallery();
    appendImagesMarkup(images);
  });
  // .catch(error => console.log(error));
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);
  // .catch(error => console.log(error));
}

function appendImagesMarkup(hits) {
  if (hits.length === 0) {
    console.log('Sorry, there are no images matching your search query. Please try again.');
  }
  console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', imagesCardsTpl(hits));
}

function clearImagesGallery() {
  refs.gallery.innerHTML = '';
}
// рендер карточок: https://youtu.be/poxVZxvONF8?t=3271

// https://youtu.be/poxVZxvONF8?t=798
