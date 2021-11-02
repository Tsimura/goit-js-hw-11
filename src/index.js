import './css/styles.css';
// import { fetchImages } from '../src/js/fetchImages';

const url = `https://pixabay.com/api`;
const keyValue = ``;
return fetch(
  `${url}/?key=24121745-05691669c6e1f2eaf3f0511ee&q=yellow+flowers&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`,
)
  .then(response => response.json())
  .then(console.log());

// Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

// Шаблон разметки карточки одного изображения для галереи.
// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
