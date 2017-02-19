import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    event: {
      info:{
        title:'',
        description: ''
      },
      dates: [],
      places: [],
      checklist: [],
      polls: [],
      participants: [],
    }
  },
  mutations: {
    loadEvent(state, event) {
      Object.assign(state,event)
    },
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
    addChecklistItem(state, item) {
      state.event.checklist.push({name: item})
    },
    removeChecklistItem(state,index){
      state.event.checklist.splice(index, 1)
    },
    updateInfo(state, info) {
      state.event.info.title = info.title
      state.event.info.description = info.description
    },
    addPoll(state, question) {
      state.event.polls.push({question, choices: []})
    },
    removePoll(state, index) {
      state.event.polls.splice(index, 1)
    },
    addChoice(state,{indexPoll, choice}) {
      state.event.polls[indexPoll].choices.push({name:choice})
    },
    removeChoice(state,{indexPoll, indexChoice}) {
      state.event.polls[indexPoll].choices.splice(indexChoice,1)
    },
    addParticipants(state, participants) {
      participants.forEach(toAdd => {
        if(!state.event.participants.find(inIt => inIt === toAdd)) {
          state.event.participants.push(toAdd)
        }
      })
    },
    removeParticipants(state, index) {
      state.event.participants.splice(index, 1)
    }
  },
  getters: {
    dates: state => {
      return state.event.dates
    },
    places: state => {
      return state.event.places
    },
    checklist: state => {
      return state.event.checklist
    },
    polls: state => {
      return state.event.polls
    },
    participants: state => {
      return state.event.participants
    },
    info: state => {
      return state.event.info
    }
  },
  strict: debug
})