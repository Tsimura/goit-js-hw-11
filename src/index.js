const axios = require('axios');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { fetchImages } from '../src/js/images-servise';
import getRefs from './js/get-refs';
import imagesCardsTpl from './templates/images-card.hbs';
import './css/styles.css';
// import ImagesApiService from './js/images-servise';
import LoadMoreBtn from './js/components/load-more-btn';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
});

const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
let searchQuery = '';
let currentPage = 1;
let totalImagesUploaded = 0;

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

  fetchImages(searchQuery, currentPage)
    .then(images => {
      clearImagesGallery();
      appendImagesMarkup(images);
      loadMoreBtn.enable();
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    })
    .catch(onFetchError);

  // scrollPageToDown();
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

  // 30 !!!не забути замінити значення після перевірки виконання умови
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

// Показав більше фото
function loadMore() {
  loadMoreBtn.disable();
  fetchImages(searchQuery, currentPage)
    .then(images => {
      appendImagesMarkup(images);
      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

// Очистив все поле
function clearImagesGallery() {
  refs.gallery.innerHTML = '';
}

// function scrollPageToDown() {
//   setTimeout(() => {
//     console.log('scrollPageToDown');
//     const { y } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
//     const viewportHeight = document.documentElement.clientHeight;
//     window.scrollBy({
//       top: viewportHeight - y * 2,
//       behavior: 'smooth',
//     });
//   }, 1500);
// }

function onFetchError(error) {
  console.log(error);
}

// function onGalleryCatchClick(e) {
//   e.preventDefault();
//   if (e.target.classList.contains('gallery-item')) {
//     return;
//   }
//   console.log(e.target);
// }
//===========================================================
// function onGalleryCatchClick(e) {
//   e.preventDefault();
//   if (e.target.classList.contains('gallery-item')) {
//     return;
//   }
//   // console.log(e.target);
// }

// async function fetchImages() {
//   try {
//     loadMoreBtn.disable();
//     imagesApiService.fetchImages().then(images => {
//     appendImagesMarkup(images);
//       scrollPageToDown();
//       loadMoreBtn.enable();
//       lightbox.refresh();
//       console.log(`Hooray! We found ${imagesApiService.totalHitsV} images.`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

//--------------------------------------------------------------- переробив

// function onSearch(event) {
//   event.preventDefault();

//   imagesApiService.query = event.currentTarget.elements.searchQuery.value.trim();
//   if (imagesApiService.query === '') {
//     return alert('Введіть параметр запиту!');
//   }

//   loadMoreBtn.show();
//   imagesApiService.resetPage();
//   clearImagesGallery();
//   fetchImages();
//   // console.log(`Hooray! We found ${imagesApiService.totalHits} images.`);
// }

// function clearImagesGallery() {
//   refs.gallery.innerHTML = '';
// }

// function loadMore() {
//   if (imagesApiService.valueImages <= 470) {
//     loadMoreBtn.hide();
//     return alert("We're sorry, but you've reached the end of search results.");
//   }
//   fetchImages();
// }

// function appendImagesMarkup(hits) {
//   const imagesMarkup = imagesCardsTpl(hits);
//   if (hits.length === 0) {
//     // console.log(hits.length);
//     alert('Sorry, there are no images matching your search query. Please try again.');
//   }
//   // console.log(hits);
//   refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
// }

// function scrollPageToDown() {
//   setTimeout(() => {
//     const { y } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
//     const viewportHeight = document.documentElement.clientHeight;
//     window.scrollBy({
//       top: viewportHeight - y * 2,
//       behavior: 'smooth',
//     });
//   }, 1500);
// }
