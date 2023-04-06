<template lang="pug">
.error-view
  .error-view__inner
    .error-view__header
      img(src="/images/client_logo-circle-bw.svg" alt="client logo")
      h4 {{ app.name }}
    .error-view__body
      template(v-if="isMobilePortrait")
        .error-view__title-box
          h1.error-view__message {{ $t('error.formatNotAvailable') }}
      template(v-else)
        img(src="/icons/error.svg" alt="error")
        .error-view__title-box
            h1.error-view__title {{ error.statusCode }}
            h2.error-view__message {{ $t('error.title') }}
        p.error-view__status-message {{ $t('error.message') }}
          | {{ ` ${error.statusMessage}` }}
        UiDsButton(
          v-if="errorRoute.path !== '/'"
          :text="$t('error.toHome')"
          @click="handleError")
</template>

<script setup lang="ts">
import { AppSetup } from '@/utils/app'

useHead({
  title: 'Error'
})

const { app } = AppSetup()
const error = useError()
const errorRoute = useRoute()
useWindowWidth()

const isMobilePortrait = useState<boolean>('mobile-portrait')

const handleError = () => { clearError({ redirect: '/' }) }
</script>

<style lang="scss" scoped>
.error-view {
  $self: &;

  background-color: $color-secondary-hard-dark;
  @include viewport-height;

  &__inner {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    max-width: $breakpoint-400;
    margin: 0 auto;
  }
  img {
    display: none;
    @include mediaSm {
      display: block;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    column-gap: $space-150;
    padding: $space-200;
    mix-blend-mode: difference;
    @include mediaSm {
      padding: $space-200 $space-400;
    }
    img {
      height: rem(52);
    }
    h4 {
      @include txt-title-300;
      color: $color-white;
    }
  }
  &__body {
    width: 100%;
    padding: $space-200;
    display: grid;
    row-gap: $space-300;
    align-content: center;

    @include mediaSm {
      padding: $space-400;
      row-gap: $space-400;
      text-align: center;

      img,
      .ds-button {
        margin: 0 auto;
      }
    }

    img {
      height: rem(120);
      @include mediaMd {
        height: rem(180);
      }
    }
  }
  &__title-box {
    color: $color-white;
    #{$self}__title {
      @include txt-title-500;
    }
    #{$self}__message {
      @include txt-title-400;
    }
  }
  &__status-message {
    @include txt-subtitle-200;
    color: $color-neutral;
    @include mediaSm {
      @include txt-subtitle-300;
    }
  }
}
</style>
