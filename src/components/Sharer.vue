<template>
  <section class="sharer flex column">
    <div class="buttons flex center">
      <h2><i class="fa fa-share-alt"/> {{ $t('app.share.title') }}</h2>
      <ul class="share-buttons">
        <li>
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}!`"
            title="Share on Facebook"
            target="_blank">
            <img
              alt="Share on Facebook"
              src="../assets/img/Facebook.svg"
              width="32"
              heigth="32" >
          </a>
        </li>
        <li>
          <a
            :href="`https://twitter.com/intent/tweet?source=${url}&text=${title}!:%20${url}`"
            target="_blank"
            title="Tweet">
            <img
              alt="Tweet"
              src="../assets/img/Twitter.svg"
              width="32"
              heigth="32" >
          </a>
        </li>
        <li>
          <a
            :href="`https://plus.google.com/share?url=${url}`"
            target="_blank"
            title="Share on Google+">
            <img
              alt="Share on Google+"
              src="../assets/img/Google+.svg"
              width="32"
              heigth="32" >
          </a>
        </li>
        <li>
          <a
            :href="`http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}!&summary=${title}&source=${url}`"
            target="_blank"
            title="Share on LinkedIn">
            <img
              alt="Share on LinkedIn"
              src="../assets/img/LinkedIn.svg"
              width="32"
              heigth="32" >
          </a>
        </li>
        <li>
          <a
            :href="`mailto:?subject=${title}!&body=${title}:%20${url}`"
            target="_blank"
            title="Send email">
            <img
              alt="Send email"
              src="../assets/img/Email.svg"
              width="32"
              heigth="32" >
          </a>
        </li>
      </ul>
    </div>
    <div class="urlShare">
      <label for="eventUrl">{{ $t('app.share.url') }}</label>
      <input
        type="text"
        id="eventUrl"
        :value="url"
        onClick="this.setSelectionRange(0, this.value.length)"
        readonly>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Sharer',
  computed: {
    url() {
      let pageurl = JSON.parse(JSON.stringify(document.location.href));
      return pageurl.replace(/edit\//,'');
    },
    title() {
      return this.$t('app.share.ref') + ' ' + this.info.title ? this.info.title : this.$t('app.share.default');
    },
    info() { return this.$store.getters.info; },
  }
};
</script>