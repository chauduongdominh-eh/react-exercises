import axios from 'axios';
import type { Axios } from 'axios';
import { MovieSearchResponse } from './models';

class ApiClient {
  private http: Axios;

  constructor() {
    const token = import.meta.env.VITE_TMDB_TOKEN;
    this.http = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: { authorization: `Bearer ${token}` },
    });
  }

  async searchMovies(query: string, signal?: AbortSignal) {
    const res = await this.http.get('/search/movie', {
      params: { query },
      signal,
    });
    return MovieSearchResponse.parse(res.data);
  }
}

export { ApiClient };
