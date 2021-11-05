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

  // console.log(imagesApiService.query);
  imagesApiService
    .fetchImages()
    .then(appendImagesMarkup)
    .catch(error => console.log(error));
}

function onLoadMore() {
  imagesApiService
    .fetchImages()
    .then(appendImagesMarkup)
    .catch(error => console.log(error));
}

function appendImagesMarkup(hits) {
  console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', imagesCardsTpl(hits));
}

// Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

// рендер карточок: https://youtu.be/poxVZxvONF8?t=3271

// https://youtu.be/poxVZxvONF8?t=798
