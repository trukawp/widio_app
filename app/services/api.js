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
  )
};

export const movieChosen = {
  update: (data) => (
      axios.post('/movie_chosen/update', data)
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
};
