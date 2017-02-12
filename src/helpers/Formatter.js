import moment from 'moment'

const dateToReadableDate = (date) => moment(date).format('Do MMM YYYY')

export default {
  dateToReadableDate
}