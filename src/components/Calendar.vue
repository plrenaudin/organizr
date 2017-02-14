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
        		:class="[{'current-day': date == initialDate && month == initialMonth && year == initialYear},'selectable',{'selected':isSelected(dayToDateString(date))}]" @click="select(date)">
                <span>{{date}}</span>
            </li>
        </ul>
        <ul class="selected">
          <li v-for="current,index in selected">
            {{formatDate(current.date)}}
            <template v-if="type === 'datetime'">
              @
              <select v-model="current.hours" class="hourInput">
                <option v-for="n in 24">{{ leftPad(""+(n-1), 2, '0') }}</option>
              </select>h
              <select v-model="current.minutes" class="hourInput">
                <option value="00">00</option>
                <option v-for="n in 11">{{ leftPad(""+(n*5), 2, '0') }}</option>
              </select>
            </template>
            <i class="fa fa-trash action" @click="selected.splice(index,1)"></i>
          </li>
        </ul>
    </div>
</template>
<script>
import moment from 'moment'
import Formatter from '../helpers/Formatter.js'
export default {
  name: 'calendar',
  props: {
    value: {
      type: Array
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return{
      today: moment(),
      dateContext: moment(),
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      selected: []
    }
  },
  methods: {
    formatDate: Formatter.dateToReadableDate,
    leftPad: Formatter.leftPad,
    addMonth() { this.dateContext = moment(this.dateContext).add(1, 'month')},
    subtractMonth() { this.dateContext = moment(this.dateContext).subtract(1, 'month')},
    dayToDateString(day) { return this.dateContext.format("YYYY-MM-") + Formatter.leftPad(""+day, 2, '0')},
    isSelected(date) { return this.selected.find(item => item.date === date) },
    onInput() { this.$emit('input', this.selected) },
    select(day) {
      let insertable = this.dayToDateString(day)
      let found = this.selected.find(item => item.date === insertable && item.hours === '00' && item.minutes === '00')
      if(!found) {
        this.selected.push({date: insertable, hours: '00', minutes: '00'})
      } else if(this.type === 'date') {
        this.selected.splice(this.selected.indexOf(found), 1)
      }
      this.onInput()
    }
  },
  computed: {
    year() { return this.dateContext.format('Y')},
    month() { return this.dateContext.format('MMMM')},
    daysInMonth() { return this.dateContext.daysInMonth()},
    currentDate() { return this.dateContext.get('date')},
    firstDayOfMonth() { return moment(this.dateContext).subtract((this.currentDate - 1), 'days').weekday()},
    initialDate() { return this.today.get('date')},
    initialMonth() { return this.today.format('MMMM')},
    initialYear() { return this.today.format('Y')}
  },
  watch: {
    value(val) { if(val !== this.selected) this.selected = val }
  }
}

</script>