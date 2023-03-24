<template lang="pug">
.menu-icon(
  :class="getIconModifiers"
  @click="toggleMenu")
  div
  div
  div
</template>

<script setup lang="ts">
const { mobileMenu, toggleMenu } = useMobileMenu()

const getIconModifiers = computed(() => [{
  'menu-icon--open': mobileMenu.value.isOpen,
  'menu-icon--is-disabled': mobileMenu.value.isDisable
}])
</script>

<style lang="scss" scoped>
.menu-icon {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: $space-400;
  height: $space-400;
  &--is-disabled {
    pointer-events: none;
  }
  > div {
    width: $space-400;
    height: $space-050;
    background: $color-white;
    transition: all 0.5s linear;
    transform-origin: 1px;
  }
  > div:nth-child(odd) {
    transform: rotate(0);
  }
  > div:nth-child(even) {
    opacity: 1;
    transform: translateX(0);
  }
  &--open {
    > div:first-child {
      transform: rotate(45deg);
    }
    > div:nth-child(2) {
      opacity: 0;
    }
    > div:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
}
</style>
