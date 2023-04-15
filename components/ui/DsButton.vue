<template lang="pug">
button.ds-button(@click="callbackHandler")
  span.ds-icon-send(v-if="sendIcon")
  | {{ text }}
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  sendIcon: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['click'])

const callbackHandler = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.ds-button {
  @include txt-title-300;
  width: fit-content;
  padding: $space-100 $space-150;
  border: 0;
  border-radius: $radius-200;
  background-color: $color-tertiary;
  color: $color-secondary;
  cursor: pointer;
  transition: all $transition-300;
  &:hover,
  &:focus,
  &:active {
    background-color: $color-contrasting;
    box-shadow: $shadow-300;
  }
  @include mediaSm {
    font-weight: 500;
  }
}
</style>
