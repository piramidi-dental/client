<template lang="pug">
ul.menu-icon(
  :class="{ 'menu-icon--open': mobileMenu }"
  @click="toggleMenu")
  li
  li
  li
</template>

<script setup lang="ts">
const mobileMenu = ref<boolean>(false)
const emit = defineEmits<{(e: 'open-mobile-menu', mobileMenu: boolean): void}>()

// eslint-disable-next-line
const toggleMenu = () : void => {
  mobileMenu.value = !mobileMenu.value
  emit('open-mobile-menu', mobileMenu.value)
}
</script>

<style lang="scss" scoped>
.menu-icon {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: $space-400;
  height: $space-400;
  li {
    width: $space-400;
    height: $space-050;
    background: $color-white;
    transition: all 0.3s linear;
    transform-origin: 1px;
  }
  li:nth-child(odd) {
    transform: rotate(0);
  }
  li:nth-child(even) {
    opacity: 1;
    transform: translateX(0);
  }
  &--open {
    li:first-child {
      transform: rotate(45deg);
    }
    li:nth-child(2) {
      opacity: 0;
    }
    li:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
}
</style>
