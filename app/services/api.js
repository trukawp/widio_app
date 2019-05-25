import axios from '../config/axios';

export const movie = {
  all: () => (
    axios.get('/movie/get/all')
  ),
  get: (id) => (
    axios.get(`/movie/get/${id}`)
  )
};

export const category = {
  all: () => (
    axios.get('/category/get/all')
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