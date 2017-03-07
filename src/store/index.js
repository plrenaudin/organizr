import Vue from 'vue'
import Vuex from 'vuex'
import Event from '../APIClient/event.js'
import Auth from '../helpers/Auth.js'
import Utils from '../helpers/Utils.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const defaultState = () => {
  return {
    _id: '',
    admin: '',
    info: {
      title: '',
      description: ''
    },
    dates: [],
    places: [],
    checklist: [],
    polls: [],
    attendees: []
  }
}

const compareDayAsc = (a, b) => {
  if (a.day < b.day) return -1
  if (a.day > b.day) return 1
  return 0
}

export default new Vuex.Store({
  state: defaultState(),
  mutations: {
    loadEvent(state, event) {
      Object.assign(state, defaultState(), event)
    },
    addDate(state, date) {
      let found = state.dates.find(item => item.day === date)
      if (found) {
        state.dates.splice(state.dates.indexOf(found), 1)
        Event.removeDate(state._id, date)
      } else {
        state.dates.push({ day: date, times: [] })
        state.dates.sort(Utils.compareDayAsc)
        Event.addDate(state._id, { day: date, times: [] })
      }
    },
    addTime(state, {day, value}) {
      let concernedDate = state.dates.find(item => item.day === day)
      let found = concernedDate.times.find(item => item === value)
      if (!found) {
        concernedDate.times.push(value)
        concernedDate.times.sort()
        Event.addTime(state._id, { day: concernedDate.day, time: value })
      }
    },
    removeDate(state, day) {
      let dateToRemove = state.dates.findIndex(item => item.day === day)
      state.dates.splice(dateToRemove, 1)
      Event.removeDate(state._id, day)
    },
    removeTime(state, {day, time}) {
      let concernedDate = state.dates.find(item => item.day === day)
      let timeIndex = concernedDate.times.indexOf(time)
      concernedDate.times.splice(timeIndex, 1)
      Event.removeTime(state._id, { day: concernedDate.day, time })
    },
    selectDatetime(state, item) {
      if (item) {
        const user = Auth.user()
        //TODO FIXME
        for (const attendee of state.attendees) {
          if (attendee.email === user) {
            if (!attendee.dates) {
              Vue.set(attendee, 'dates', [])
            }
            let index = attendee.dates.indexOf(item)
            if (index > -1) {
              attendee.dates.splice(index, 1)
              Event.unselectDatetime(state._id, item)
            }
            else {
              attendee.dates.push(item)
              Event.selectDatetime(state._id, item)
            }
            break;
          }
        }
      }
    },
    addPlace(state, place) {
      if (place && !state.places.find(i => i.name === place.name)) {
        state.places.push(place)
        Event.addPlace(state._id, place)
      }
    },
    removePlace(state, index) {
      let itemToRemove = state.places[index]
      state.places.splice(index, 1)
      Event.removePlace(state._id, itemToRemove)
    },
    togglePlace(state, item) {
      if (item) {
        const user = Auth.user()
        //TODO FIXME
        for (const attendee of state.attendees) {
          if (attendee.email === user) {
            if (!attendee.places) {
              Vue.set(attendee, 'places', [])
            }
            let index = attendee.places.indexOf(item)
            if (index > -1) {
              attendee.places.splice(index, 1)
              Event.unselectPlace(state._id, item)
            }
            else {
              attendee.places.push(item)
              Event.selectPlace(state._id, item)
            }
            break;
          }
        }
      }
    },
    addChecklistItem(state, item) {
      if (item && !state.checklist.find(i => i === item)) {
        state.checklist.push(item)
        Event.addChecklistItem(state._id, item)
      }
    },
    removeChecklistItem(state, index) {
      let itemToRemove = state.checklist[index]
      state.checklist.splice(index, 1)
      Event.removeChecklistItem(state._id, itemToRemove)
    },
    toggleChecklistItem(state, item) {
      if (item) {
        const user = Auth.user()
        //TODO FIXME
        for (const attendee of state.attendees) {
          if (attendee.email === user) {
            if (!attendee.checklist) {
              Vue.set(attendee, 'checklist', [])
            }
            let index = attendee.checklist.indexOf(item)
            if (index > -1) {
              attendee.checklist.splice(index, 1)
              Event.uncheckChecklistItem(state._id, item)
            }
            else {
              attendee.checklist.push(item)
              Event.checkChecklistItem(state._id, item)
            }
            break;
          }
        }
      }
    },
    updateInfo(state, info) {
      state.info.title = info.title
      state.info.description = info.description
      Event.updateInfo(state._id, info)
    },
    addPoll(state, question) {
      if (question && !state.polls.find(item => item.question === question)) {
        state.polls.push({ question, choices: [] })
        Event.addPoll(state._id, { question, choices: [] })
      }
    },
    removePoll(state, pollIndex) {
      let pollToRemove = state.polls[pollIndex]
      state.polls.splice(pollIndex, 1)
      Event.removePoll(state._id, pollToRemove)
    },
    addChoice(state, {indexPoll, choice}) {
      if (choice && !state.polls[indexPoll].choices.find(item => item === choice)) {
        let concernedPoll = state.polls[indexPoll]
        concernedPoll.choices.push(choice)
        Event.addPollQuestion(state._id, { question: concernedPoll.question, choice })
      }
    },
    removeChoice(state, {indexPoll, indexChoice}) {
      let concernedPoll = state.polls[indexPoll]
      let choiceToRemove = concernedPoll.choices[indexChoice]
      concernedPoll.choices.splice(indexChoice, 1)
      Event.removePollQuestion(state._id, { question: concernedPoll.question, choice: choiceToRemove })
    },

    vote(state, {question, choice}) {
      const user = Auth.user()
      //TODO FIXME
      for (const attendee of state.attendees) {
        if (attendee.email === user) {
          if (!attendee.polls) {
            Vue.set(attendee, 'polls', [])
          }
          let found = attendee.polls.find(item => item.question === question)
          if (!found) {
            attendee.polls.push({ question, choice })
            Event.vote(state._id, { question, choice })
          }
          break;
        }
      }
    }
  },
  getters: {
    dates: state => {
      let result = JSON.parse(JSON.stringify(state.dates))
      return result.sort(compareDayAsc).map( item => item.times.sort() && item);
    },
    places: state => state.places,
    checklist: state => state.checklist,
    polls: state => state.polls,
    info: state => state.info,
    admin: state => state.admin,
    attendees: state => state.attendees,

    attendeesWhoVoted: state => state.attendees.filter(a => a.polls && a.polls.length > 0),
    attendeesWhoSelectedPlace: state => state.attendees.filter(a => a.places && a.places.length > 0),
    attendeesWhoSelectedDate: state => state.attendees.filter(a => a.dates && a.dates.length > 0),
    attendeesWhoCheckedList: state => state.attendees.filter(a => a.checklist && a.checklist.length > 0)

  },
  strict: debug
})