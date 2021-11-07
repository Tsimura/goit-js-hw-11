const axios = require('axios');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getRefs from './js/get-refs';
import imagesCardsTpl from './templates/images-card.hbs';
import './css/styles.css';
import ImagesApiService from './js/images-servise';
import LoadMoreBtn from './js/components/load-more-btn';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
});

const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
const imagesApiService = new ImagesApiService();
// let elem = document.querySelector('.container');
// let infScroll = new InfiniteScroll(elem, {
//   path: loadMore,
//   append: imagesApiService.page,
//   // outlayer: msnry,
//   // status: '.page-load-status',
// });
// console.log('page:', imagesApiService.page);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMore);
refs.gallery.addEventListener('click', onGalleryCatchClick);

function onGalleryCatchClick(e) {
  e.preventDefault();
  if (e.target.classList.contains('gallery-item')) {
    return;
  }
  console.log(e.target);
}

function onSearch(event) {
  event.preventDefault();

  imagesApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (imagesApiService.query === '') {
    return alert('Введіть параметр запиту!');
  }
  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesGallery();
  fetchImages();
  // console.log('page:', imagesApiService.page);
  // console.log('totalHits:', imagesApiService.totalHits);
}

function loadMore() {
  if (imagesApiService.valueImages <= 470) {
    loadMoreBtn.hide();
    return alert("We're sorry, but you've reached the end of search results.");
  }
  fetchImages();
}

async function fetchImages() {
  try {
    if (imagesApiService.page === 1) {
      console.log('page:', imagesApiService.page);
      console.log('valueImages:', imagesApiService.valueImages);
      console.log('totalHits:', imagesApiService.totalHits);
      console.log(imagesApiService);
      console.log(`Hooray! We found ${imagesApiService.totalHits} images.`);
    }
    loadMoreBtn.disable();
    imagesApiService.fetchImages().then(images => {
      console.log('page:', imagesApiService.page);
      console.log('totalHits:', imagesApiService.totalHits);
      appendImagesMarkup(images);
      scrollPageToDown();
      loadMoreBtn.enable();
      lightbox.refresh();
      console.log(`Hooray! We found ${imagesApiService.totalHits} images.`);
      console.log(imagesApiService);
      console.log('valueImages:', imagesApiService.valueImages);
    });
  } catch (error) {
    console.log(error);
  }
}

function appendImagesMarkup(hits) {
  const imagesMarkup = imagesCardsTpl(hits);
  if (hits.length === 0) {
    alert('Sorry, there are no images matching your search query. Please try again.');
  }
  console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
}

function clearImagesGallery() {
  refs.gallery.innerHTML = '';
}

function scrollPageToDown() {
  setTimeout(() => {
    const { y } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    window.scrollBy({
      top: viewportHeight - y * 2,
      behavior: 'smooth',
    });
  }, 1000);
}
