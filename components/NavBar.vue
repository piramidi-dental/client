<template lang="pug">
.nav-bar
  .nav-bar__inner
    .nav-bar__logo-box(
      :class="{ 'nav-bar__logo-box--disable': linkDisableHandle('home') }"
      @click="navigateTo({ path: '/' })")
      img(v-if="isResponsiveSm" src="/images/client_logo-circle-bw.svg" alt="client logo")
      h4.nav-bar__title {{ app.name }}
    ui-icon-menu(v-if="!isResponsiveMd")
    .nav-bar__list(v-else)
      ui-ds-link(
        v-for="item in pagesList"
        :key="item.name"
        :disable="linkDisableHandle(item.name)"
        :name="$t(`pages.${item.name}`)"
        size="small"
        :to="item.link")
</template>

<script setup lang="ts">
import type { IApp } from '@/utils/app'

const route = useRoute()
const { $globalUtils } = useNuxtApp()
const { isResponsiveSm, isResponsiveMd } = useMediaResponsive()

const app = useState<IApp>('app')

const linkDisableHandle = (title: string) : boolean => route.meta.title === title

const { data: pagesList } = useFetch<IStringItem[]>('/api/pages?toFilter=home')
</script>

<style lang="scss" scoped>
.nav-bar {
  $self: &;

  background-color: transparent;
  position: fixed;
  width: 100%;
  mix-blend-mode: difference;

  z-index: 1;
  &--visible {
    z-index: 3;
  }
  @include mediaMd {
    padding: 0 $space-400;
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-200;
    @include mediaSm {
      padding: $space-200 $space-400;
    }
    @include mediaMd {
      padding: $space-200 0;
      margin: 0 auto;
      max-width: $breakpoint-700
    }
  }
  &__logo-box {
    display: flex;
    align-items: center;
    column-gap: $space-150;
    cursor: pointer;
    img {
      height: rem(52);
    }
    #{$self}__title {
      @include txt-title-300;
      color: $color-white;
    }
    &--disable {
      pointer-events: none;
    }
  }
  &__list {
    display: flex;
    .ds-link {
      display: flex;
      &:not(:last-child)::after {
        content: "";
        width: $border-size-200;
        background: $color-white;
        height: 100%;
        margin: 0 $space-200;
      }
      &.router-link-active {
        color: $color-contrasting;
        font-weight: 500;
      }
    }
  }
}
</style>
