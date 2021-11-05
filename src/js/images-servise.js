const axios = require('axios');
export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // https://youtu.be/2lvJn5yrv5c?t=1685

  async fetchImages() {
    // console.log(this);
    const url = `https://pixabay.com/api`;
    const key = `24121745-05691669c6e1f2eaf3f0511ee`;

    //https://youtu.be/poxVZxvONF8?t=2597

    // return
    const response = await fetch(
      `${url}/?key=${key}&q=${this.searchQuery}&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    );
    console.log(response);
    const newImage = await response.json().then(data => {
      this.incrementPage();
      console.log(data);
      return data.hits;
    });
    return newImage;
    //============================================================
    //   try {
    //     const response = await axios.get(
    //       `${url}/?key=${key}&q=${this.searchQuery}&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`,
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
