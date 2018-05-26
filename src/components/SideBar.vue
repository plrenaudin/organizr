<template>
  <aside>
    <div>
      <section id="user">
        <div class="tools">
          <saving-indicator/>
        </div>
        <div 
          class="profile" 
          @click="$router.push('/profile')">
          <label>{{ user }}</label>
          <figure class="userPicture">
            <i class="fa fa-2x fa-home"/>
          </figure>
        </div>
      </section>
      <div 
        class="toggleButton" 
        v-if="isOwner">
        <router-link :to="'/edit/' + eventId"><i class="fa fa-pencil"/> <label>{{ $t('app.sidebar.editEvent') }}</label></router-link>
        <router-link :to="'/' + eventId"><i class="fa fa-eye"/> <label>{{ $t('app.sidebar.viewEvent') }}</label></router-link>
      </div>
      <section id="menuSection">
        <nav>
          <ul>
            <li 
              class="color0" 
              @click="$emit('scrollto','info')" 
              v-show="!view || (info.title || info.description)">
              <div class="menu">
                <i class="fa fa-file-text-o"/><label>{{ $t('app.menu.info') }}</label>
              </div>
              <ul 
                class="peek" 
                v-show="info.title || info.description">
                <li v-show="info.title">{{ info.title }}</li>
                <li v-show="info.description">{{ info.description }}</li>
              </ul>
            </li>
            <li 
              class="color1" 
              @click="$emit('scrollto','calendar')" 
              v-show="!view || dates.length > 0">
              <div class="menu">
                <i class="fa fa-calendar"/><label>{{ $t('app.menu.datetime') }}</label>
              </div>
              <ul 
                class="peek" 
                v-show="dates.length > 0">
                <li v-for="seletedDate in dates">
                  {{ formatDate(seletedDate.day) }}
                  <template v-if="seletedDate.times.length > 0">
                    <span> ({{ seletedDate.times.length }}) </span>
                  </template>
                </li>
              </ul>
            </li>
            <li 
              class="color2" 
              @click="$emit('scrollto','place')" 
              v-show="!view || places.length > 0">
              <div class="menu">
                <i class="fa fa-map-marker"/><label>{{ $t('app.menu.location') }}</label>
              </div>
              <ul 
                class="peek" 
                v-show="places.length > 0">
                <li v-for="place in places">{{ place.name }}</li>
              </ul>
            </li>
            <li 
              class="color3" 
              @click="$emit('scrollto','checklist')" 
              v-show="!view || checklist.length > 0">
              <div class="menu">
                <i class="fa fa-list"/><label>{{ $t('app.menu.checklist') }}</label>
              </div>
              <ul 
                class="peek" 
                v-show="checklist.length > 0">
                <li>{{ checklist.length }} item{{ checklist.length > 1 ? 's' : '' }}</li>
              </ul>
            </li>
            <li 
              class="color4" 
              @click="$emit('scrollto','poll')" 
              v-show="!view || polls.length > 0">
              <div class="menu">
                <i class="fa fa-bullhorn"/><label>{{ $t('app.menu.polls') }}</label>
              </div>
              <ul 
                class="peek" 
                v-show="polls.length > 0">
                <li v-for="poll in polls">{{ poll.question }} ({{ poll.choices.length }})</li>
              </ul>
            </li>
          </ul>
        </nav>
      </section>
    </div>
    <sharer/>
  </aside>
</template>
<script>
import Formatter from '../helpers/Formatter.js';
import Auth from '../helpers/Auth.js';
import Sharer from './Sharer.vue';
import SavingIndicator from './SavingIndicator.vue';

export default {
  name: 'SideBar',
  components: { Sharer, SavingIndicator },
  props: ['view', 'eventId'],
  computed: {
    info() { return this.$store.getters.info; },
    dates() { return this.$store.getters.dates; },
    places() { return this.$store.getters.places; },
    checklist() { return this.$store.getters.checklist; },
    polls() { return this.$store.getters.polls; },
    isOwner() { return this.$store.getters.admin === Auth.user(); },
    user() { return Auth.username(); }
  },
  methods: {
    formatDate: Formatter.dateToReadableDate
  }
};
</script>