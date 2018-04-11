<template>
  <div class="checkbox">
    <input 
      type="checkbox"
      :disabled="disabled"
      :id="id"
      :name="name"
      ref="input">
    <label 
      :for="id" 
      v-html="label">&nbsp;</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
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
  data () {
    return {
      inputValue: null
    };
  },
  watch: {
    inputValue () {
      if (Array.isArray(this.inputValue) || (!Array.isArray(this.inputValue) && this.inputValue)
      ) {
        this.$refs.input.checked = true;
      } else {
        this.$refs.input.checked = false;
      }
    },
    value () {
      this.inputValue = this.value;
    }
  },
  mounted () {
    this.inputValue = this.value;
  }
};
</script>