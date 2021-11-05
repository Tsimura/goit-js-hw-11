const axios = require('axios');
export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // https://youtu.be/2lvJn5yrv5c?t=1685

  async fetchImages() {
    // console.log(this);
    const BASE_URL = `https://pixabay.com/api`;
    const API_KEY = `24121745-05691669c6e1f2eaf3f0511ee`;

    //https://youtu.be/poxVZxvONF8?t=2597

    // return
    // підведення підсумків https://youtu.be/poxVZxvONF8?t=3957
    const response = await fetch(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`,
    );
    console.log(response);
    const newImage = await response.json().then(({ hits, totalHits }) => {
      this.incrementPage();
      console.log(hits);
      // console.log('totalHits:', totalHits);
      return hits;
    });
    return newImage;
    //============================================================
    //   try {
    //     const response = await axios.get(
    //       `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`,
    //     );
    //     console.log(response);

    //     const newImage = await response.json();
    //     const hits = await newImage.then(data => {
    //       this.incrementPage();

    //       console.log(data);
    //       return data.hits;
    //     });

    //     console.log(response);
    //     console.log(newImage);
    //     console.log(hits);
    //     return hits;
    //   } catch (error) {
    //     console.log(error);
    //   }
    //============================================================
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
