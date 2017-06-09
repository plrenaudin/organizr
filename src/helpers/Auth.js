import Formatter from './Formatter.js'
import Hello from 'hellojs'

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
  logout() {
    Hello.logout(JSON.parse(localStorage.getItem('profile')).network)
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}