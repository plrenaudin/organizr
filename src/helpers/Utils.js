import Formatter from './Formatter.js'

const parseJwt = token => {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace('-', '+').replace('_', '/')
  return window.atob(base64)
}

const parseTimeInput = input => {
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
}

const compareDayAsc = (a, b) => {
  if (a.day < b.day) return -1
  if (a.day > b.day) return 1
  return 0
}


const getTimestampFromId = id => parseInt(id.toString().substring(0, 8), 16) * 1000

const generateColorList = size => {
  let predefined = [
    "#26A69A",
    "#8D6E63",
    "#66BB6A",
    "#EC407A",
    "#FFA726",
    "#EF5350",
    "#FFEE58",
    "#26C6DA",
    "#FFCA28",
    "#BDBDBD",
    "#5C6BC0",
    "#AB47BC",
    "#42A5F5",
    "#7E57C2",
    "#FF7043",
    "#9CCC65",
    "#29B6F6",
    "#D4E157",
    "#78909C"
  ]
  if (size <= predefined.length) {
    return predefined
  } else {
    return predefined.concat(new Array(size - predefined.length).fill().map((item,index) => generateColor(index)))
  }
}

const generateColor = input => {
  let str = isNaN(input) ? input : Number(input) * 13150;

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#000000".substring(0, 7 - c.length) + c;
}

export { parseJwt, parseTimeInput, compareDayAsc, getTimestampFromId, generateColorList, generateColor}