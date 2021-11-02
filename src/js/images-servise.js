export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);
    const url = `https://pixabay.com/api`;
    const key = `24121745-05691669c6e1f2eaf3f0511ee`;
    return fetch(
      `${url}/?key=${key}&q=${this.searchQuery}&image_type=photo&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
