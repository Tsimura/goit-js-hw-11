// class: https://www.youtube.com/watch?v=pRZaFoXlBLU&ab_channel=GoIT
const axios = require('axios');
export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.valueImages = null;
    this.totalHits = '';
  }

  // https://youtu.be/2lvJn5yrv5c?t=1685
  async fetchImages() {
    // console.log(this);
    const BASE_URL = `https://pixabay.com/api`;
    const API_KEY = `24121745-05691669c6e1f2eaf3f0511ee`;
    const FILTER = `image_type=photo&image_type=photo&orientation=horizontal&safesearch=true`;

    //https://youtu.be/poxVZxvONF8?t=2597

    // return
    // підведення підсумків https://youtu.be/poxVZxvONF8?t=3957
    try {
      const response = await fetch(
        `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&${FILTER}&per_page=10&page=${this.page}`,
      );
      // console.log(response);
      const newImage = await response.json().then(({ hits, totalHits, valueImages }) => {
        this.valueImages = totalHits - hits.length * this.page;
        this.totalHits = totalHits;
        this.incrementPage();
        return hits;
      });
      return newImage;
    } catch (error) {
      console.log(error.message);
    }
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
