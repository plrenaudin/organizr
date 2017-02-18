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
            {{$t('app.menu.intro')}}<i class="fa fa-file-text-o"></i>
          </li>
          <li class="color1" @click="$emit('scrollto','calendar')">
            {{$t('app.menu.datetime')}}<i class="fa fa-calendar"></i>
          </li>
          <li class="color2" @click="$emit('scrollto','place')">
            {{$t('app.menu.location')}}<i class="fa fa-map-marker"></i>
          </li>
          <li class="color3" @click="$emit('scrollto','checklist')">
            {{$t('app.menu.checklist')}}<i class="fa fa-list"></i>
          </li>
          <li class="color4" @click="$emit('scrollto','poll')">
            {{$t('app.menu.polls')}}<i class="fa fa-bullhorn"></i>
          </li>
          <li class="color5" @click="$emit('scrollto','participant')">
            {{$t('app.menu.participants')}}<i class="fa fa-users"></i>
          </li>
        </ul>
      </nav>
    </section>
  </aside>
</template>
<script>
  export default {
    name: 'side-bar'
  }
</script>