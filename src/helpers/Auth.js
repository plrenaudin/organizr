export default {
  isAuthenticated() {
    return !!localStorage.getItem('profile')
  },
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}