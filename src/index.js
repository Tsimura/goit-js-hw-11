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
  // captionsData: 'alt',
  // captionPosition: 'bottom',
  // captionDelay: 250,
});
lightbox.on('show.simplelightbox', function () {
  console.log(123);
});

const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
const imagesApiService = new ImagesApiService();

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
      console.log(`Hooray! We found ${imagesApiService.totalHits} images.`);
    }
    loadMoreBtn.disable();
    imagesApiService.fetchImages().then(images => {
      console.log('totalHits:', imagesApiService.totalHits);
      appendImagesMarkup(images);
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
  // console.log(this.valueImages);
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
}

function clearImagesGallery() {
  refs.gallery.innerHTML = '';
}

// function scrollPageToDown() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
