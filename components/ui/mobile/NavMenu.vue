<template lang="pug">
.nav-menu
  ul.nav-menu__list
    li(
      v-for="item in pagesList"
      :key="item.name"
      @click="handleNavigation(item.link)") {{ item.name }}
</template>

<script setup lang="ts">
const route = useRoute()
const emit = defineEmits<{(e: 'handle-mobile-menu'): void}>()

const pagesList = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Servizi e terapie',
    link: '/terapies'
  },
  {
    name: 'Lo studio',
    link: ''
  },
  {
    name: 'Contatti',
    link: ''
  }
]

const handleNavigation = (link: string): void => {
  if (route.path === link) {
    emit('handle-mobile-menu')
  } else { navigateTo({ path: link }) }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  padding: $space-200;
  &__list {
    display: grid;
    row-gap: $space-200;
    width: fit-content;
    &::after {
      content: "";
      height: $border-size-200;
      width: 100%;
      display: block;
      background: $color-soft-neutral;
      grid-row: 4;
    }
    li {
      @include txt-title-400;
      @include link-primary;
      cursor: pointer;
      &:last-child {
        @include link-tertiary;
      }
    }
  }
}
</style>
