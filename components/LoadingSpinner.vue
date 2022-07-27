<template lang="pug">
.loading-spinner
  svg.loading-spinner__wave(viewBox="0 0 100 100" preserveAspectRatio="none")
    path(id="wave-svg" :fill="stylesColors.hardDark" vector-effect="non-scaling-stroke" :d="svgShapes[0]")
  .loading-spinner__triangle-wrapper
    .loading-spinner__triangle-svg
      svg(viewBox="0 0 86 80")
        polygon(points="43 8 79 72 7 72")
    h1.loading-spinner__text Servizi e terapie
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { $gsap, $globalUtils } = useNuxtApp()

const indicator = useLoadingIndicator({
  duration: 2000,
  throttle: 200
})
const svgShapes = [
  'M 0 100 V 100 Q 50 100 100 100 V 100 z',
  'M 0 100 V 50 Q 50 0 100 50 V 100 z',
  'M 0 100 V 0 Q 50 0 100 0 V 100 z'
]

const tweenController = ref<GSAPTimeline | null>(null)
const stylesColors = reactive<{ softDark: string, hardDark: string }>({ softDark: '', hardDark: '' })

const getIsLoading = computed<boolean>(() => indicator.isLoading.value)
const bodyClass = computed<string>(() => `main-body${getIsLoading.value ? ' overflow-hidden' : ''}`)

useHead({
  bodyAttrs: {
    class: bodyClass
  }
})

nuxtApp.hook('page:start', indicator.start)
nuxtApp.hook('page:finish', indicator.finish)

function useLoadingIndicator (opts: {
  duration: number,
  throttle: number
}) {
  const progress = ref(0)
  const isLoading = ref(false)
  const step = computed(() => 10000 / opts.duration)

  let _timer: any = null // eslint-disable-line
  let _throttle: any = null // eslint-disable-line

  function start () {
    clear()
    progress.value = 0
    isLoading.value = true
    animationActionsHandler('play')
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
        animationActionsHandler('reverse')
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

const animationActionsHandler = (action: string) : void => {
  if (tweenController.value) { tweenController.value[action]() }
}

const animationHandler = () : void => {
  nextTick(() => {
    const _tween = $gsap.timeline()
    const style = getComputedStyle(document.body)

    for (const color in stylesColors) {
      (stylesColors as { [key: string]: string })[color] = style.getPropertyValue(`--color-secondary-${$globalUtils.kebabToDashesConverter(color)}`)
    }

    _tween.fromTo('.loading-spinner', { display: 'none' }, { display: 'block' })

    _tween.to('#wave-svg', { attr: { d: svgShapes[1] }, ease: 'easeIn', duration: 0.5 }, '<')
    _tween.to('#wave-svg', { attr: { d: svgShapes[2] }, ease: 'easeOut', duration: 0.5, fill: stylesColors.softDark })
    _tween.to('.loading-spinner__triangle-wrapper', { opacity: 1, ease: 'easeOut', duration: 0.5 }, '<')
    _tween.to('.loading-spinner', { fill: stylesColors.softDark })

    _tween.pause()
    tweenController.value = _tween
  })
}

onMounted(animationHandler)
onBeforeUnmount(() => indicator.clear)
</script>

<style lang="scss" scoped>
.loading-spinner {
  $self: &;

  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999999;

  &__wave {
    position: absolute;
    width: 150%;
    height: 100%;
    left: -25%;
    top: 0;
    transform: rotate(180deg);
  }

  &__triangle {
    &-wrapper {
      opacity: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    &-svg {
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
  }

  &__text {
    color: $color-white;
    @include txt-body-600;
    margin-top: $space-200;
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
