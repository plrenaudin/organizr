<template>
  <div class="myEvents">
    <div v-show="!loading">
      <ul class="eventList">
        <li
          class="card"
          @click="$emit('create')"><h2><i class="fa fa-magic"/> {{ $t('app.profilePage.createEvent') }}</h2></li>
        <li
          class="card"
          v-for="event in events"
          @click="$router.push('/' + event._id)"
          :key="event.id">
          <i
            class="fa fa-trash action"
            @click.stop="deleteEvent(event._id)"
            v-if="isAdmin(event)"/>
          <h2>
            {{ formatEventName(event) }}
          </h2>
          <div class="dates">
            <i class="fa fa-calendar"/> {{ getEventDates(event) }}
            <i
              class="fa fa-pencil"
              :title="$t('app.profilePage.isAdmin')"
              v-if="isAdmin(event)"/>
          </div>
          <attendees :list="event.attendees"/>
        </li>
      </ul>
      <div
        class="splash"
        v-if="!events.length">
        <i class="fa fa-2x fa-frown-o"/>
        <span>{{ $t('app.profilePage.noEvents') }}</span>
      </div>
    </div>
    <loading v-show="loading"/>
  </div>
</template>
<script>
import Event from '../APIClient/event.js';
import Formatter from '../helpers/Formatter.js';
import {compareDayAsc, getTimestampFromId} from '../helpers/Utils.js';
import Attendees from './Attendees.vue';
import Loading from './Loading.vue';
import Auth from '../helpers/Auth.js';

export default {
  name:'MyEvents',
  components:{Attendees, Loading},
  data() {
    return {
      events:[],
      loading: false
    };
  },
  created() {
    this.loadEvents();
  },
  methods: {
    formatEventName: Formatter.formatEventName,
    isAdmin(event) {
      return event.admin === Auth.user();
    },
    deleteEvent(eventId) {
      this.$bus.$emit('confirm', this.$t('app.profilePage.deleteEvent'), this.doDelete, eventId);
    },
    doDelete(eventId) {
      Event.delete(eventId, err => {
        if(err) {
          console.error(err);
        } else {
          this.loadEvents();
        }
      });
    },
    getEventDates(event) {
      if(event && event.dates && event.dates.length > 0) {
        const result = event.dates.slice().sort(compareDayAsc);
        return Formatter.dateToReadableDate(result[0].day) +
        ' - ' + Formatter.dateToReadableDate(result[result.length - 1].day);
      } else {
        return ' ? - ? ';
      }
    },
    loadEvents() {
      this.loading = true;
      Event.listMyEvents((err, response) => {
        if(err) {
          console.error(err);
        } else {
          this.events = response.data.sort((a,b) => {
            return getTimestampFromId(b._id) - getTimestampFromId(a._id);
          });
        }
        this.loading = false;
      });
    }
  }
};
</script>