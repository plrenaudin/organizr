<template>
  <aside>
    <section id="user">
      <figure class="userPicture">
        <i class="fa fa-2x fa-user-o"></i>
      </figure>
      Pilou
    </section>
    <section id="menuSection">
      <nav>
        <ul>
          <li class="color0" @click="$emit('scrollto','intro')">
            <div class="menu">
              {{$t('app.menu.intro')}}<i class="fa fa-file-text-o"></i>
            </div>
            <ul class="peek" v-show="intro.title || intro.description">
              <li v-show="intro.title">{{intro.title}}</li>
              <li v-show="intro.description">{{intro.description}}</li>
            </ul>
          </li>
          <li class="color1" @click="$emit('scrollto','calendar')">
            <div class="menu">
              {{$t('app.menu.datetime')}}<i class="fa fa-calendar"></i>
            </div>
            <ul class="peek">
              <li v-for="seletedDate in dates">
                {{formatDate(seletedDate.date)}}
                <template v-if="seletedDate.times.length > 0">
                  <span> ({{seletedDate.times.length}}) </span>
                </template>
              </li>
            </ul>
          </li>
          <li class="color2" @click="$emit('scrollto','place')">
            <div class="menu">
              {{$t('app.menu.location')}}<i class="fa fa-map-marker"></i>
            </div>
            <ul class="peek" v-show="places.length > 0">
              <li v-for="place in places">{{place.name}}</li>
            </ul>
          </li>
          <li class="color3" @click="$emit('scrollto','checklist')">
            <div class="menu">
              {{$t('app.menu.checklist')}}<i class="fa fa-list"></i>
            </div>
            <ul class="peek" v-show="checklist.length > 0">
              <li>{{checklist.length}} item{{checklist.length > 1 ? 's' : ''}}</li>
            </ul>
          </li>
          <li class="color4" @click="$emit('scrollto','poll')">
            <div class="menu">
              {{$t('app.menu.polls')}}<i class="fa fa-bullhorn"></i>
            </div>
            <ul class="peek" v-show="polls.length > 0">
              <li v-for="poll in polls">{{poll.question}} ({{poll.choices.length}})</li>
            </ul>
          </li>
          <li class="color5" @click="$emit('scrollto','participant')">
            <div class="menu">
              {{$t('app.menu.participants')}}<i class="fa fa-users"></i>
            </div>
            <ul class="peek" v-show="participants.length > 0">
              <li v-for="participant in participants">{{participant}}</li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  </aside>
</template>
<script>
  import Formatter from '../helpers/Formatter.js'
  export default {
    name: 'side-bar',
    computed: {
      intro() { return this.$store.getters.intro },
      dates() { return this.$store.getters.dates },
      places() { return this.$store.getters.places },
      checklist() { return this.$store.getters.checklist },
      polls() { return this.$store.getters.polls },
      participants() { return this.$store.getters.participants },
    },
    methods: {
      formatDate: Formatter.dateToReadableDate
    }
  }
</script>