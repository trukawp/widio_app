import axios from '../config/axios';

// TODO: Validate api paths
export const auth = {
  signIn: (params) =>
    axios.post('/user/login', params),
  signUp: (params) =>
    axios.post('/user/register', params),
};

export const movie = {
  all: () => (
    axios.get('/movie/get/all')
  ),
  get: (id) => (
    axios.get(`/movie/get/${id}`)
  ),
  getMovieMedias: (id) => (
    axios.get(`/movie/${id}/movie_medias`)
  ),
};

export const movieChosen = {
  update: (data) => (
    axios.post('/movie_chosen/update', data)
  ),
  delete: (id) => (
    axios.delete(`/movie_chosen/${id}`)
  ),
};

export const movieWatched = {
  update: (data) => (
    axios.post('/movie_watched/update', data)
  ),
  delete: (id) => (
    axios.delete(`/movie_watched/${id}`)
  ),
};

export const category = {
  all: () => (
    axios.get('/category/get/all')
  ),
  getCategoryMovies: (id) => (
    axios.get(`/category/${id}/category_movies`)
  ),
};

export const kid = {
  all: () => (
    axios.get('/kid/get/all')
  ),
  get: (id) => (
    axios.get(`/kid/get/${id}`)
  ),
  getKidChoices: (id) => (
    axios.get(`/kid/${id}/kid_choices`)
  ),
  getKidWatched: (id) => (
    axios.get(`/kid/${id}/kid_watched`)
  ),
  update: (data) => (
    axios.post('/kid/update', data)
  ),
  findByEmail: (email) => (
    axios.get(`/kid/get/email?email=${email}`)
  ),
};

  export const media = {
  all: () => (
    axios.get('/media/get/all')
  ),
};
