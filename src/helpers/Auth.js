export default {
  isAuthenticated() {
    return !!localStorage.getItem('profile')
  },
  user() {
    return this.isAuthenticated() && JSON.parse(localStorage.getItem('profile')).email
  },
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}