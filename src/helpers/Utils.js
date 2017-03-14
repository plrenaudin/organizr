import Formatter from './Formatter.js'
export default {

  parseTimeInput (input) {
    const data = input.replace(/[^0-9]/g, '')
    let hours = '00'
    let minutes = '00'
    if (!data) { return '00:00' }

    if (data.length <= 2) {
      hours = Formatter.leftPad(data, 2, '0')
    } else if (data.length === 3) {
      hours = Formatter.leftPad(data.substring(0, 1), 2, '0')
      minutes = Formatter.leftPad(data.substring(1, 3), 2, '0')
    } else {
      hours = Formatter.leftPad(data.substring(0, 2), 2, '0')
      minutes = Formatter.leftPad(data.substring(2, 4), 2, '0')
    }
    hours = Number(hours) > 23 ? '23' : hours
    minutes = Number(minutes) > 59 ? '59' : minutes
    return hours + ':' + minutes
  },

  compareDayAsc (a, b) {
    if (a.day < b.day) return -1
    if (a.day > b.day) return 1
    return 0
  },
  getTimestampFromId (id) {
    return parseInt( id.toString().substring(0, 8), 16 ) * 1000
  }
}