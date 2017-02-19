<template>
    <div class="calendar">
      calendarViewer
    </div>
</template>
<script>
import moment from 'moment'
import Formatter from '../../helpers/Formatter.js'
import Utils from '../../helpers/Utils.js'

export default {
  name: 'calendar-viewer',
  methods: {
    formatDate: Formatter.dateToReadableDate
  },
  computed: {
    dates() { return this.$store.getters.dates }
  }
}
</script>