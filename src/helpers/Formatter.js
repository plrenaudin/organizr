import moment from 'moment'

const dateToReadableDate = (date) => moment(date,"YYYY-MM-DD").format('Do MMM YYYY')
const leftPad = (item, length, char) => {
  if (!item || item.length >= length) {return item}
  return (new Array(Math.ceil((length - item.length)) + 1).join(char)).substr(0, (length - item.length)) + item;
}

export default {
  leftPad,
  dateToReadableDate
}