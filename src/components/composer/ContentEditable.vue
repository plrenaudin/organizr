<template>
  <div :class="['contentEditable',{focused:focused} ]" @click="focused = true" >
    <span v-if="!focused">{{value}}</span>
    <input v-else type="text" ref="userInput" @keyup.enter="change" @blur="change" :value="value" />
  </div>
</template>
<script>
export default {
  name:"ContentEditable",
  props: ['value'],
  data() {
    return {
      focused: false,
      inputValue: this.value
    }
  },
  methods: {
    change(event) {
      if(event.target.value !== this.inputValue) {
        this.inputValue = event.target.value;
        this.$emit('change');
      }
      this.focused = false;
    }
  },
  watch: {
    // whenever question changes, this function will run
    focused: function (newFocus) {
      this.$nextTick().then(()=> {
        newFocus && this.$refs.userInput.focus();
      })
    }
  }
}
</script>