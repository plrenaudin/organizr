import Vue from 'vue'
import Vuex from 'vuex'
import Event from '../APIClient/event.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
      _id:'',
      admin:'',
      info:{
        title:'',
        description: ''
      },
      dates: [],
      places: [],
      checklist: [],
      polls: [],
      guests: [],
      participants:[]
  },
  mutations: {
    loadEvent(state, event) {
      Object.assign(state,event)
    },
    addDate(state, date) {
      let found = state.dates.find(item => item.date === date)
      if (found) {
        state.dates.splice(state.dates.indexOf(found), 1)
      } else {
        state.dates.push({ date, times: [] })
      }
    },
    addTime(state, {index, value}) {
      state.dates[index].times.push(value)
    },
    removeDate(state, dateIndex) {
      state.dates.splice(dateIndex, 1)
    },
    removeTime(state, {dateIndex, timeIndex}) {
      state.dates[dateIndex].times.splice(timeIndex, 1)
    },
    selectPlace(state, place) {
      if(place && !state.places.find(i => i.name === place.name)) {
        state.places.push(place)
        Event.addPlace(state._id, place)
      }
    },
    removePlace(state, index) {
      let itemToRemove = state.places[index]
      state.places.splice(index, 1)
      Event.removePlace(state._id, itemToRemove)
    },
    addChecklistItem(state, item) {
      if(item && !state.checklist.find(i => i === item)) {
        state.checklist.push(item)
        Event.addChecklistItem(state._id, item)
      }
    },
    removeChecklistItem(state, index){
      let itemToRemove = state.checklist[index]
      state.checklist.splice(index, 1)
      Event.removeChecklistItem(state._id, itemToRemove)
    },
    updateInfo(state, info) {
      state.info.title = info.title
      state.info.description = info.description
      Event.updateInfo(state._id, info)
    },
    addPoll(state, question) {
      state.polls.push({question, choices: []})
    },
    removePoll(state, index) {
      state.polls.splice(index, 1)
    },
    addChoice(state,{indexPoll, choice}) {
      state.polls[indexPoll].choices.push({name:choice})
    },
    removeChoice(state,{indexPoll, indexChoice}) {
      state.polls[indexPoll].choices.splice(indexChoice,1)
    },
    addGuest(state, guests) {
      guests.forEach(toAdd => {
        if(!state.guests.find(inIt => inIt === toAdd)) {
          state.guests.push(toAdd)
        }
      })
    },
    removeGuest(state, index) {
      state.guests.splice(index, 1)
    }
  },
  getters: {
    dates: state => {
      return state.dates
    },
    places: state => {
      return state.places
    },
    checklist: state => {
      return state.checklist
    },
    polls: state => {
      return state.polls
    },
    guests: state => {
      return state.guests
    },
    guests: state => {
      return state.guests
    },
    info: state => {
      return state.info
    }
  },
  strict: debug
})