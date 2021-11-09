const axios = require('axios');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
let allImages = 0;
let imagesFound = 0;
// const imagesApiService = new ImagesApiService();
// let elem = document.querySelector('.container');
// let infScroll = new InfiniteScroll(elem, {}

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMore);
refs.gallery.addEventListener('click', onGalleryCatchClick);

//пошук картинок
function onSearch(event) {
  event.preventDefault();
  // loadMoreBtn.disable();
  resetCurrentPage();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    return alert('Введіть параметр запиту!');
  }
  clearImagesGallery();
  fetchImages(searchQuery, currentPage).then(appendImagesMarkup).catch(onFetchError);

  loadMoreBtn.show();
  // scrollPageToDown();
  // console.log('searchQuery:', searchQuery);
  console.log('Знайшли всього фото:', imagesFound);
}

// скинути значення поточної сторінки
function resetCurrentPage() {
  currentPage = 1;
}

// відобразив карточки з фото
function appendImagesMarkup({ totalHits, hits }) {
  const imagesMarkup = imagesCardsTpl(hits);
  allImages += hits.length;
  imagesFound += totalHits;
  console.log('Знайшли всього фото:', imagesFound);
  console.log('hits:', hits);
  console.log('totalHits:', totalHits);
  console.log('allImages:', allImages);

  if (allImages === totalHits) {
    loadMoreBtn.hide();
    return alert("We're sorry, but you've reached the end of search results.");
  }

  currentPage += 1;
  if (hits.length === 0) {
    alert('Sorry, there are no images matching your search query. Please try again.');
  }

  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
  lightbox.refresh();
}

// Показав більше фото
function loadMore() {
  // if (imagesApiService.valueImages <= 470) {
  // loadMoreBtn.hide();
  //   return alert("We're sorry, but you've reached the end of search results.");
  // }
  fetchImages(searchQuery, currentPage).then(appendImagesMarkup).catch(onFetchError);
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

function onGalleryCatchClick(e) {
  e.preventDefault();
  if (e.target.classList.contains('gallery-item')) {
    return;
  }
  console.log(e.target);
}
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
