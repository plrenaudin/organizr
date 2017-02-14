import wording from '../locales/translation.json'

export default (key) => {
  let keys = key.split('.')
  let cur = wording
  for (let i = 0; i < keys.length; i++) {
    if (!(cur = cur[keys[i]])) {
      cur = key
      break
    }
  }
  return cur
}