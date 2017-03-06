<template>
  <div class="checkbox">
    <input type="checkbox"
      :disabled="disabled"
      :id="id"
      :name="name"
      ref="input">
    <label :for="id" v-html="label">&nbsp;</label>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    data () {
      return {
        inputValue: null
      }
    },
    props: {
      disabled: Boolean,
      id: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      value: {
        required: false
      }
    },
    watch: {
      inputValue () {
        if (Array.isArray(this.inputValue) || (!Array.isArray(this.inputValue) && this.inputValue)
        ) {
          this.$refs.input.checked = true
        } else {
          this.$refs.input.checked = false
        }
      },
      value () {
        this.inputValue = this.value
      }
    },
    mounted () {
      this.inputValue = this.value
    }
  }
</script>