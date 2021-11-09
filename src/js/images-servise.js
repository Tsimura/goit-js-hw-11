// відправка запиту на бек
const axios = require('axios');
const BASE_URL = `https://pixabay.com/api`;
const API_KEY = `24121745-05691669c6e1f2eaf3f0511ee`;
const FILTER = `image_type=photo&image_type=photo&orientation=horizontal&safesearch=true`;

async function fetchImages(images, currentPage) {
  try {
    const response = await axios.get(
      `${BASE_URL}/?key=${API_KEY}&q=${images}&${FILTER}&per_page=40&page=${currentPage}`,
    );
    // const newImages = response.data;
    return await response.data;
  } catch (error) {
    console.log(error);
  }
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
