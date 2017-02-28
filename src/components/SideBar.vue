<template>
  <aside>
    <section id="user">
      <div class="profile" @click="$router.push('/profile')">
        <figure class="userPicture">
          <i class="fa fa-2x fa-user-o"></i>
        </figure>
        {{user}}
      </div>
      <div class="tools">
        <template v-if="isOwner">
          <template v-if="view">
            <router-link :to="'/edit/' + eventId"><i class="fa fa-pencil"></i> {{$t('app.sidebar.editEvent')}}</router-link>
          </template>
          <template v-else>
            <router-link :to="'/' + eventId"><i class="fa fa-eye"></i> {{$t('app.sidebar.viewEvent')}}</router-link>
          </template>
        </template>
      </div>
    </section>
    <section id="menuSection">
      <nav>
        <ul>
          <li class="color0" @click="$emit('scrollto','info')" v-show="!view || (info.title || info.description)">
            <div class="menu">
              {{$t('app.menu.info')}}<i class="fa fa-file-text-o"></i>
            </div>
            <ul class="peek" v-show="info.title || info.description">
              <li v-show="info.title">{{info.title}}</li>
              <li v-show="info.description">{{info.description}}</li>
            </ul>
          </li>
          <li class="color1" @click="$emit('scrollto','calendar')" v-show="!view || dates.length > 0">
            <div class="menu">
              {{$t('app.menu.datetime')}}<i class="fa fa-calendar"></i>
            </div>
            <ul class="peek" v-show="dates.length > 0">
              <li v-for="seletedDate in dates">
                {{formatDate(seletedDate.date)}}
                <template v-if="seletedDate.times.length > 0">
                  <span> ({{seletedDate.times.length}}) </span>
                </template>
              </li>
            </ul>
          </li>
          <li class="color2" @click="$emit('scrollto','place')" v-show="!view || places.length > 0">
            <div class="menu">
              {{$t('app.menu.location')}}<i class="fa fa-map-marker"></i>
            </div>
            <ul class="peek" v-show="places.length > 0">
              <li v-for="place in places">{{place.name}}</li>
            </ul>
          </li>
          <li class="color3" @click="$emit('scrollto','checklist')" v-show="!view || checklist.length > 0">
            <div class="menu">
              {{$t('app.menu.checklist')}}<i class="fa fa-list"></i>
            </div>
            <ul class="peek" v-show="checklist.length > 0">
              <li>{{checklist.length}} item{{checklist.length > 1 ? 's' : ''}}</li>
            </ul>
          </li>
          <li class="color4" @click="$emit('scrollto','poll')" v-show="!view || polls.length > 0">
            <div class="menu">
              {{$t('app.menu.polls')}}<i class="fa fa-bullhorn"></i>
            </div>
            <ul class="peek" v-show="polls.length > 0">
              <li v-for="poll in polls">{{poll.question}} ({{poll.choices.length}})</li>
            </ul>
          </li>
          <li class="color5" @click="$emit('scrollto','participant')" v-show="!view || guests.length > 0">
            <div class="menu">
              {{$t('app.menu.guests')}}<i class="fa fa-users"></i>
            </div>
            <ul class="peek" v-show="guests.length > 0">
              <li v-for="participant in guests">{{participant}}</li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  </aside>
</template>
<script>
  import Formatter from '../helpers/Formatter.js'
  import Utils from '../helpers/Utils.js'
  import Auth from '../helpers/Auth.js'

  export default {
    name: 'side-bar',
    props: ['view', 'eventId'],
    data() {
      return {
        user: Utils.getUserName(localStorage.getItem('profile'))
      }
    },
    computed: {
      info() { return this.$store.getters.info },
      dates() { return this.$store.getters.dates },
      places() { return this.$store.getters.places },
      checklist() { return this.$store.getters.checklist },
      polls() { return this.$store.getters.polls },
      guests() { return this.$store.getters.guests },
      isOwner() { return this.$store.getters.admin === Auth.user() }
    },
    methods: {
      formatDate: Formatter.dateToReadableDate
    }
  }
</script>