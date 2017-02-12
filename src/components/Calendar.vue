<template>
    <div class="calendar">
        <div class="calendar-header">
            <i class="fa fa-fw fa-chevron-left action" @click="subtractMonth"></i>
            <h4> {{month + ' ' + year}}</h4>
            <i class="fa fa-fw fa-chevron-right action" @click="addMonth"></i>
        </div>
        <ul class="weekdays">
            <li v-for="day in days">{{day}}</li>
        </ul>
        <ul class="dates">
            <li v-for="blank in firstDayOfMonth">&nbsp;</li>
            <li v-for="date in daysInMonth"
        		:class="[{'current-day': date == initialDate && month == initialMonth && year == initialYear},'selectable',{'selected':isSelected(dayToDate(date))}]" @click="select(date)">
                <span>{{date}}</span>
            </li>
        </ul>
        <ul class="selected">
          <li v-for="current,index in selected">
            {{formatDate(current)}} <i class="fa fa-trash action" @click="selected.splice(index,1)"></i>
          </li>
        </ul>
    </div>
</template>
<script>
import moment from 'moment'
import Formatter from '../helpers/Formatter.js'
export default {
  name: 'calendar',
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
    addMonth() { this.dateContext = moment(this.dateContext).add(1, 'month')},
    subtractMonth() { this.dateContext = moment(this.dateContext).subtract(1, 'month')},
    dayToDate(day) { return new Date(this.dateContext.format("YYYY-MM-") + day)},
    isSelected(date) { return this.selected.find(item => item.getTime() === date.getTime()) },
    select(day) {
      let insertable = this.dayToDate(day)
      let found = this.isSelected(insertable)
      if(!found) {
        this.selected.push(insertable)
      } else {
        this.selected.splice(this.selected.indexOf(found), 1)
      }
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
  }
}

</script>