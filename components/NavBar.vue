<template lang="pug">
.nav-bar
  .nav-bar__inner
    .nav-bar__logo-box(
      ref="navBarLogoBox"
      :class="{ 'nav-bar__logo-box--disable': linkDisableHandle('home') }"
      @click="navigateTo({ path: '/' })")
      img(v-if="isResponsiveSm" src="/images/client_logo-circle-bw.svg" alt="client logo")
      h4.nav-bar__title {{ app.name }}
    UiMobileIconMenu(v-if="!isResponsiveMd")
    .nav-bar__list(v-else)
      UiDsLink(
        v-for="(item, index) in pagesList"
        :key="item.name"
        v-show="index !== 0"
        :disable="linkDisableHandle(item.name)"
        :name="item.name"
        size="small"
        :to="item.link")
</template>

<script setup lang="ts">
import { AppSetup } from '@/utils/app'

const route = useRoute()
const { app } = AppSetup()
const { $globalUtils } = useNuxtApp()
const { isResponsiveSm, isResponsiveMd } = useWindowWidth()

const pagesList = [
  {
    name: 'home',
    link: '/'
  },
  {
    name: 'terapies',
    link: '/terapies'
  },
  {
    name: 'clinic',
    link: ''
  },
  {
    name: 'contacts',
    link: ''
  }
]

const navBarLogoBox = ref<HTMLElement | null>(null)

const linkDisableHandle = (title: string) : boolean => route.meta.title === $globalUtils.capitalizeString(title)

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
    @include mediaMd {
      padding: $space-200 0;
      margin: 0 auto;
      max-width: $breakpoint-500
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
      ::v-deep(.router-link-active) {
        color: $color-tertiary;
      }
    }
  }
}
</style>
