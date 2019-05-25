import axios from 'config/axios';

const auth_storage = '__auth__'

export const auth = {

  history: null,
  auth: null,

  init(history) {
    this.history = history
    let ut = JSON.parse(localStorage.getItem(auth_storage))
    if (ut) {
      this.auth = ut
      Object.assign(axios.defaults, {headers: {authorization: ut.token}})
    }
  },

  authenticate(response) {
    this.auth = {
      token: response.headers.authorization,
      user: {
        email: response.data.username,
        authority: response.data.authorities.map(a => a.authority)[0]
      }
    }
    localStorage.setItem(auth_storage, JSON.stringify(this.auth))
    Object.assign(axios.defaults, {headers: {authorization: response.headers.authorization}})
  },

  logout() {
    this.auth = null
    localStorage.removeItem(auth_storage)
    this.history.push('/')
  },
  
  hasAuthority(authority) {
    return this.isLogged() && this.auth.user.authority === authority
  },
  
  isLogged() {
    return !!this.auth
  },
  
  getEmail() {
    return this.auth.user.email
  },

  getAuthority() {
    return this.auth.user.authority
  }

}
