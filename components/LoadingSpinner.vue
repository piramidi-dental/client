<template lang="pug">
.loading-spinner(v-if="getIsLoading")
  .loading-spinner__wrapper
    .loading-spinner__triangle
      svg(viewBox="0 0 86 80")
        polygon(points="43 8 79 72 7 72")
    h1.loading-spinner__text Loading text...
  .loading-spinner__wave-wrapper
    .loading-spinner__wave-svg
      svg(viewBox="0 0 1440 120" aria-hidden="true")
        path(d="M1440,21.2101911 L1440,120 L0,120 L0,21.2101911 C120,35.0700637 240,42 360,42 C480,42 600,35.0700637 720,21.2101911 C808.32779,12.416393 874.573633,6.87702029 918.737528,4.59207306 C972.491685,1.8109458 1026.24584,0.420382166 1080,0.420382166 C1200,0.420382166 1320,7.35031847 1440,21.2101911 Z")
</template>

<script setup lang="ts">
const indicator = useLoadingIndicator({
  duration: 2000,
  throttle: 200
})

const getIsLoading = computed<boolean>(() => indicator.isLoading.value)
const bodyClass = computed<string>(() => getIsLoading.value ? 'overflow-hidden' : '')

useHead({
  bodyAttrs: {
    class: bodyClass
  }
})

const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', indicator.start)
nuxtApp.hook('page:finish', indicator.finish)
onBeforeUnmount(() => indicator.clear)

function useLoadingIndicator (opts: {
  duration: number,
  throttle: number
}) {
  const progress = ref(0)
  const isLoading = ref(false)
  const step = computed(() => 10000 / opts.duration)

  // eslint-disable-next-line
  let _timer: any = null
  // eslint-disable-next-line
  let _throttle: any = null

  function start () {
    clear()
    progress.value = 0
    isLoading.value = true
    if (opts.throttle) {
      if (process.client) {
        _throttle = setTimeout(_startTimer, opts.throttle)
      }
    } else {
      _startTimer()
    }
  }

  function finish () {
    progress.value = 100
    _hide()
  }

  function clear () {
    clearInterval(_timer)
    clearTimeout(_throttle)
    _timer = null
    _throttle = null
  }

  function _increase (num: number) {
    progress.value = Math.min(100, progress.value + num)
  }

  function _hide () {
    clear()
    if (process.client) {
      setTimeout(() => {
        isLoading.value = false
        setTimeout(() => { progress.value = 0 }, 400)
      }, 500)
    }
  }

  function _startTimer () {
    if (process.client) {
      _timer = setInterval(() => { _increase(step.value) }, 100)
    }
  }

  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  }
}
</script>

<style lang="scss" scoped>
.loading-spinner {
  $self: &;

  background: $color-secondary-hard-dark;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999999;

  &__wave {
    &-wrapper {
      z-index: -1;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 35%;
      width: 100%;
      background-color: $color-secondary-soft-dark;
    }
    &-svg {
      transform: translateY(-50%);
      width: 140%;
      color: $color-secondary-soft-dark;
      margin-left: -20%;
      animation: 3s ease-in-out infinite alternate waveAnimateA;
      svg {
        fill: currentColor;
        width: 102%;
        margin-left: -1%;
        height: auto;
      }
    }
  }

  &__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    #{$self}__triangle {
      $duration: 3s;

      width: rem(48);
      height: rem(44);
      position: relative;
      display: inline-block;

      &:before {
        content: '';
        width: rem(6);
        height: rem(6);
        border-radius: 50%;
        position: absolute;
        display: block;
        background: $color-tertiary;
        top: rem(37);
        left: rem(21);
        transform: translate(rem(-10), rem(-18));
        animation: dotTriangle $duration cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        polygon {
          fill: none;
          stroke: $color-primary;
          stroke-width: rem(10);
          stroke-linejoin: round;
          stroke-linecap: round;
          stroke-dasharray: 145 (221 - 145) 145 (221 - 145);
          stroke-dashoffset: 0;
          animation: pathTriangle $duration cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
      }
    }

    #{$self}__text {
      color: $color-white;
      @include txt-body-600;
      margin-top: $space-200;
    }
  }
}

@keyframes waveAnimateA {
  0% {
    transform: translate(-80px,-52%);
  }

  100% {
    transform: translate(80px,-50%);
  }
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }
  66% {
    transform: translate(10px, -18px);
  }
  100% {
    transform: translate(-10px, -18px);
  }
}
</style>
