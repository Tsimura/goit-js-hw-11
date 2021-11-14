const axios = require('axios');
const BASE_URL = `https://pixabay.com/api`;
const API_KEY = `24121745-05691669c6e1f2eaf3f0511ee`;
const FILTER = `image_type=photo&image_type=photo&orientation=horizontal&safesearch=true`;

let isLoading = false;
async function fetchImages(images, currentPage) {
  // console.log('currentPage:', currentPage);
  if (isLoading) return;
  isLoading = true;
  try {
    const response = await axios.get(
      `${BASE_URL}/?key=${API_KEY}&q=${images}&${FILTER}&per_page=40&page=${currentPage}`,
    );
    isLoading = false;
    // console.log('Запит на бек!');

    return await response.data;
  } catch (error) {
    onFetchError(error);
  }
}

function onFetchError(error) {
  console.log(error);
}
export { fetchImages };

//без async/await:
// function fetchImages(images, currentPage) {
//   return fetch(
//     `${BASE_URL}/?key=${API_KEY}&q=${images}&${FILTER}&per_page=40&page=${currentPage}`,
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }

// ========================== розібратись!!!!
function onEntry(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      page += 1;
      api(page);
    }
  });
}

const observer = new IntersectionObserver(onEntry, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
});
console.log(observer);
// https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API
