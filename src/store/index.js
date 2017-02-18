import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    event: {
      dates: [],
      places: []
    }
  },
  mutations: {
    addDate(state, date) {
      let found = state.event.dates.find(item => item.date === date)
      if (found) {
        state.event.dates.splice(state.event.dates.indexOf(found), 1)
      } else {
        state.event.dates.push({ date, times: [] })
      }
    },
    addTime(state, {index, value}) {
      state.event.dates[index].times.push(value)
    },
    removeDate(state, dateIndex) {
      state.event.dates.splice(dateIndex, 1)
    },
    removeTime(state, {dateIndex, timeIndex}) {
      state.event.dates[dateIndex].times.splice(timeIndex, 1)
    },
    selectPlace(state, place) {
      state.event.places.push(place)
    },
    removePlace(state, index) {
      state.event.places.splice(index, 1)
    },
  },
  getters: {
    selectedDates: state => {
      return state.event.dates
    },
    selectedPlaces: state => {
      return state.event.places
    }
  },
  strict: debug
})