import moment from 'moment';
import t from './Translate.js';

export default {
  dateToReadableDate: (date) => moment(date, 'YYYY-MM-DD').format('Do MMM YYYY'),
  leftPad: (item, length, char) => {
    if (!item || item.length >= length) { return item; }
    return (new Array(Math.ceil((length - item.length)) + 1).join(char)).substr(0, (length - item.length)) + item;
  },
  formatEventName: (event) => {
    return (event.info && event.info.title) ? event.info.title : t('app.defaultEventName');
  },
  formatNameByEmail: (email) => email.substr(0, email.indexOf('@'))

};