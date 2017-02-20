import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
      info:{
        title:'',
        description: ''
      },
      dates: [],
      places: [],
      checklist: [],
      polls: [],
      participants: []
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
      state.dates[index].times.push({ time: value })
    },
    removeDate(state, dateIndex) {
      state.dates.splice(dateIndex, 1)
    },
    removeTime(state, {dateIndex, timeIndex}) {
      state.dates[dateIndex].times.splice(timeIndex, 1)
    },
    selectPlace(state, place) {
      state.places.push(place)
    },
    removePlace(state, index) {
      state.places.splice(index, 1)
    },
    addChecklistItem(state, item) {
      state.checklist.push({name: item})
    },
    removeChecklistItem(state,index){
      state.checklist.splice(index, 1)
    },
    updateInfo(state, info) {
      state.info.title = info.title
      state.info.description = info.description
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
    addParticipants(state, participants) {
      participants.forEach(toAdd => {
        if(!state.participants.find(inIt => inIt === toAdd)) {
          state.participants.push(toAdd)
        }
      })
    },
    removeParticipants(state, index) {
      state.participants.splice(index, 1)
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
    participants: state => {
      return state.participants
    },
    info: state => {
      return state.info
    }
  },
  strict: debug
})