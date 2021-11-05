// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
//=======
import imagesCardsTpl from './templates/images-card.hbs';
import './css/styles.css';
import ImagesApiService from './js/images-servise';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMore);

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
}
function loadMore() {
  fetchImages();
  // console.log('totalHits:', totalHits);
}

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
    // console.log('hits:', hits);
    // console.log('totalHits:', totalHits);
  });
}

function appendImagesMarkup(hits) {
  if (hits.length === 0) {
    alert('Sorry, there are no images matching your search query. Please try again.');
  }
  // console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', imagesCardsTpl(hits));
}

function clearImagesGallery() {
  refs.gallery.innerHTML = '';
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
