<template>
    <div class="calendar">
        <div class="calendar-header">
            <i class="fa fa-fw fa-chevron-left action" @click="subtractMonth"></i>
            <h3> {{month + ' ' + year}}</h3>
            <i class="fa fa-fw fa-chevron-right action" @click="addMonth"></i>
        </div>
        <ul class="weekdays">
            <li v-for="day in days">{{day}}</li>
        </ul>
        <ul class="dates">
            <li v-for="blank in firstDayOfMonth">&nbsp;</li>
            <li v-for="date in daysInMonth"
        		:class="[
              {'current-day': date == initialDate && month == initialMonth && year == initialYear},
              'selectable',
              {'selected':isSelected(dayToDateString(date))}
              ]" @click="select(date)">
                <span>{{date}}</span>
            </li>
        </ul>
        <div class="chosenDates" v-show="selected.length > 0">
          <ul class="selected">
            <li v-for="current,dateIndex in selected">
              <i class="fa fa-trash action" @click="removeDate(dateIndex)"></i>
              <div class="formattedDate">
                {{formatDate(current.date)}}
              </div>
              <div v-for="time,timeIndex in current.times">
                <i class="fa fa-times action" @click="removeTime(dateIndex, timeIndex)"></i> {{time.time}}
              </div>
              <div class="timeInput">
                <input type="text"
                  placeholder="00:00"
                  :name="'addTime-' +dateIndex"
                  @keyup.enter="addTime"
                  @blur="addTime">
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import Formatter from '../../helpers/Formatter.js'
import Utils from '../../helpers/Utils.js'

export default {
  name: 'calendar',
  data() {
    return{
      today: moment(),
      dateContext: moment(),
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }
  },
  methods: {
    formatDate: Formatter.dateToReadableDate,
    addMonth() { this.dateContext = moment(this.dateContext).add(1, 'month')},
    subtractMonth() { this.dateContext = moment(this.dateContext).subtract(1, 'month')},
    dayToDateString(day) { return this.dateContext.format("YYYY-MM-") + Formatter.leftPad(""+day, 2, '0')},
    isSelected(date) { return this.selected.find(item => item.date === date) },
    select(day) {
      let insertable = this.dayToDateString(day)
      this.$store.commit('addDate', insertable)
    },
    addTime(event) {
      if(!event.target.value) return
      const value = Utils.parseTimeInput(event.target.value)
      const index = event.target.name.substring(8)
      this.$store.commit('addTime', {index, value})
      event.target.value = ''
      if(event.type !== "blur") {
        event.target.focus()
      }
    },
    removeDate(dateIndex) {
      this.$store.commit('removeDate', dateIndex)
    },
    removeTime(dateIndex, timeIndex) {
      this.$store.commit('removeTime', {dateIndex, timeIndex})
    }
  },
  computed: {
    selected() {return this.$store.getters.dates},
    year() { return this.dateContext.format('Y')},
    month() { return this.dateContext.format('MMMM')},
    daysInMonth() { return this.dateContext.daysInMonth()},
    currentDate() { return this.dateContext.get('date')},
    firstDayOfMonth() { return moment(this.dateContext).subtract((this.currentDate - 1), 'days').weekday()},
    initialDate() { return this.today.get('date')},
    initialMonth() { return this.today.format('MMMM')},
    initialYear() { return this.today.format('Y')}
  }
}

</script>