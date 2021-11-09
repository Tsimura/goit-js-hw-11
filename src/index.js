const axios = require('axios');
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import getRefs from './js/get-refs';
import { fetchImages } from '../src/js/images-servise';
import imagesCardsTpl from './templates/images-card.hbs';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
let searchQuery = '';
let currentPage = 1;
let totalImagesUploaded = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
});
// const imagesApiService = new ImagesApiService();
// let elem = document.querySelector('.container');
// let infScroll = new InfiniteScroll(elem, {}

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMore);
// refs.gallery.addEventListener('click', onGalleryCatchClick);

//============ бЛОК ФУНКЦІЙ:
//пошук картинок
function onSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  resetCurrentPage();
  resetTotalImagesUpload();
  if (searchQuery === '') {
    return Notiflix.Notify.failure('Введіть параметр запиту!');
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();

  fetchImages(searchQuery, currentPage).then(images => {
    clearImagesGallery();
    appendImagesMarkup(images);

    loadMoreBtn.enable();
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    scrollPageToDown();
  });

  scrollPageToDown();
}

// скинути значення поточної сторінки
function resetCurrentPage() {
  currentPage = 1;
}

function resetTotalImagesUpload() {
  totalImagesUploaded = 0;
}
// відобразив карточки з фото
function appendImagesMarkup({ totalHits, hits }) {
  const imagesMarkup = imagesCardsTpl(hits);
  totalImagesUploaded += hits.length;
  // console.log('hits:', hits);
  // console.log('totalImagesUploaded:', totalImagesUploaded);

  if (totalImagesUploaded === totalHits) {
    console.log('totalImagesUploaded:', totalImagesUploaded);
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.hide();
  }

  incrementPage();
  if (hits.length === 0) {
    alert('Sorry, there are no images matching your search query. Please try again.');
  }
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
  lightbox.refresh();
}

// наступна сторінка
function incrementPage() {
  currentPage += 1;
}

// Очистив все поле
function clearImagesGallery() {
  refs.gallery.innerHTML = '';
}

function loadMore() {
  loadMoreBtn.disable();
  fetchImages(searchQuery, currentPage).then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
  });

  // scrollPageToDown();
}
function scrollPageToDown() {
  setTimeout(() => {
    console.log('scrollPageToDown');
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    // const viewportHeight = document.documentElement.clientHeight;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }, 1500);
}

window.addEventListener('scroll', autoScroll);

function autoScroll() {
  // console.log(window.scrollY);
  // console.log(window.innerHeight);
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    // loadImages();
    loadMore();
    console.log('autoScroll');
  }
}
