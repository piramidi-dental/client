<template lang="pug">
.nav-menu
  ul.nav-menu__list
    li(
      v-for="item in pagesList"
      :key="item.name"
      @click="handleNavigation(item.link)") {{ $t(`pages.${item.name}`) }}
</template>

<script setup lang="ts">
const route = useRoute()
const emit = defineEmits<{(e: 'handle-mobile-menu'): void}>()

const handleNavigation = (link: string): void => {
  if (route.path === link) {
    emit('handle-mobile-menu')
  } else { navigateTo({ path: link }) }
}

const { data: pagesList } = useFetch<IStringItem[]>('/api/pages')
</script>

<style lang="scss" scoped>
.nav-menu {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  padding: $space-200;
  @include mediaSm {
    padding: $space-400;
  }
  &__list {
    display: grid;
    row-gap: $space-200;
    width: fit-content;
    @include mediaSm {
      row-gap: $space-300;
    }
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
      @include mediaSm {
        @include txt-title-500;
      }
      &:last-child {
        @include link-tertiary;
      }
    }
  }
}
</style>
