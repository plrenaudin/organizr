import Formatter from './Formatter.js'
import Utils from './Utils.js'

export default {
  isAuthenticated() {
    return !!localStorage.getItem('profile')
  },
  user() {
    return this.isAuthenticated() && JSON.parse(localStorage.getItem('profile')).email
  },
  username() {
    const user = this.user()
    return user ? Formatter.formatNameByEmail(user) : ''
  },
  login(token) {
    let data = JSON.parse(Utils.parseJwt(token))
    localStorage.setItem('id_token', token)
    localStorage.setItem('profile', JSON.stringify(data))
  },
  logout() {
    localStorage.clear()
  }
}