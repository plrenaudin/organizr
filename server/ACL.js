const compareDayAsc = (a, b) => {
  if (a.day < b.day) return -1
  if (a.day > b.day) return 1
  return 0
}

module.exports = {
  tidyEvent: (event) => {
    event.dates.sort(compareDayAsc)
    event.dates.map( item => item.times.sort() && item)
    return event
  }
}