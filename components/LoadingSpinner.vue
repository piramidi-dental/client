<template lang="pug">
.loading-spinner(:class="{ 'loading-spinner--before-mount': !appIsMounted }")
  svg.loading-spinner__wave(viewBox="0 0 100 100" preserveAspectRatio="none")
    path(id="wave-svg" :fill="svgValues.fill" vector-effect="non-scaling-stroke" :d="svgValues.shape")
  .loading-spinner__triangle-wrapper
    .loading-spinner__triangle-svg
      svg(viewBox="0 0 86 80")
        polygon(points="43 8 79 72 7 72")
    h1.loading-spinner__text {{ animationText }}
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { LOADING } from '@/constants'

const nuxtApp = useNuxtApp()
const { $gsap, $globalUtils } = useNuxtApp()
const loadingStore = useLoadingStore()

const svgShapes = [
  'M 0 100 V 100 Q 50 100 100 100 V 100 z',
  'M 0 100 V 50 Q 50 0 100 50 V 100 z',
  'M 0 100 V 0 Q 50 0 100 0 V 100 z'
]

const isLoadingActive = ref<boolean>(false)
const tweenControllerInit = ref<GSAPTimeline | null>(null)
const tweenController = ref<GSAPTimeline | null>(null)
const appIsMounted = ref<boolean>(false)
const stylesColors = reactive<{ softDark: string, hardDark: string }>({ softDark: '', hardDark: '' })

const bodyClass = computed<string>(() => `main-body${isLoadingActive.value ? ' overflow-hidden' : ''}`)
const svgValues = computed<{ [key: string]: string }>(() => appIsMounted.value // eslint-disable-line
  ? { shape: svgShapes[0], fill: svgColor('hardDark') }
  : { shape: svgShapes[2], fill: svgColor('softDark') }
)
const animationText = computed<string>(() => { // eslint-disable-line
  return appIsMounted.value ? loadingStore.text : 'piramidi.dental'
})

useHead({
  bodyAttrs: {
    class: bodyClass
  }
})

const setStyledColors = () : void => {
  const style = getComputedStyle(document.body)

  for (const color in stylesColors) {
    (stylesColors as { [key: string]: string })[color] = style.getPropertyValue(`--color-secondary-${$globalUtils.kebabToDashesConverter(color)}`)
  }
}

const svgColor = (colorName: string) : string => {
  return (stylesColors as { [key: string]: string })[colorName] || 'transparent'
}

const useLoadingIndicator = (opts: {
  duration: number,
  throttle: number
}) => {
  const progress = ref(0)
  const step = computed(() => 10000 / opts.duration)

  let _timer: any = null // eslint-disable-line
  let _throttle: any = null // eslint-disable-line

  const start = () => {
    clear()
    progress.value = 0
    isLoadingActive.value = true
    if (appIsMounted.value) { animationActionsHandler([tweenController.value, 'play']) }
    if (opts.throttle) {
      if (process.client) {
        _throttle = setTimeout(_startTimer, opts.throttle)
      }
    } else {
      _startTimer()
    }
  }

  const finish = () => {
    progress.value = 100
    _hide()
  }

  const clear = () => {
    clearInterval(_timer)
    clearTimeout(_throttle)
    _timer = null
    _throttle = null
  }

  const _increase = (num: number) => {
    progress.value = Math.min(100, progress.value + num)
  }

  const _hide = () => {
    clear()
    if (process.client) {
      setTimeout(() => {
        const _action = appIsMounted.value
          ? [tweenController.value, 'reverse'] as [(GSAPTimeline | null), string]
          : [tweenControllerInit.value, 'play'] as [(GSAPTimeline | null), string]
        animationActionsHandler(_action)

        setTimeout(() => { progress.value = 0 }, 400)
        handleAnimationComplete()
      }, 500)
    }
  }

  const _startTimer = () => {
    if (process.client) {
      _timer = setInterval(() => { _increase(step.value) }, 100)
    }
  }

  return {
    progress,
    start,
    finish,
    clear
  }
}

const animationActionsHandler = (actions: [(GSAPTimeline | null), string]) : void => {
  const [_controller, actionType] = actions
  if (_controller) { _controller[actionType]() }
}

const handleAnimationComplete = () => {
  setTimeout(() => {
    isLoadingActive.value = false
    if (!appIsMounted.value) { appIsMounted.value = true }
  }, LOADING.ANIMATION_DELAY)
}

const animationHandler = () : void => {
  nextTick(() => {
    const _tween = $gsap.timeline({ paused: true })

    _tween.to('.loading-spinner', { display: 'block' })

    _tween.to('#wave-svg', { attr: { d: svgShapes[1] }, ease: 'easeIn', duration: 0.5 }, '<')
    _tween.to('#wave-svg', { attr: { d: svgShapes[2] }, ease: 'easeOut', duration: 0.5, fill: stylesColors.softDark })
    _tween.to('.loading-spinner__triangle-wrapper', { opacity: 1, ease: 'easeOut', duration: 0.5 }, '<')
    _tween.to('.loading-spinner', { css: { backgroundColor: stylesColors.softDark } })

    tweenController.value = _tween
  })
}

const initAnimationHandler = () => {
  nextTick(() => {
    const _tween = $gsap.timeline({ paused: true })

    _tween.to('.loading-spinner', { css: { backgroundColor: 'transparent' } })
    _tween.to('#wave-svg', { attr: { d: svgShapes[1] }, ease: 'easeOut', duration: 0.5 })
    _tween.to('.loading-spinner__triangle-wrapper', { opacity: 0, ease: 'easeOut', duration: 0.5 }, '<')
    _tween.to('#wave-svg', { attr: { d: svgShapes[0] }, ease: 'easeIn', duration: 0.5, fill: stylesColors.hardDark })
    _tween.to('.loading-spinner', { display: 'none' })

    tweenControllerInit.value = _tween
  })
}

const indicator = useLoadingIndicator({
  duration: 2000,
  throttle: 200
})

onMounted(async () => {
  await setStyledColors()
  await initAnimationHandler()
  await animationHandler()

  indicator.start()
})
onBeforeUnmount(() => indicator.clear)

watch(() => loadingStore.isActive, (val: boolean) => {
  indicator[val ? 'start' : 'finish']()
})

nuxtApp.hook('page:start', indicator.start)
nuxtApp.hook('page:finish', indicator.finish)

</script>

<style lang="scss" scoped>
.loading-spinner {
  $self: &;

  display: none;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999999;

  &--before-mount {
    display: block;
    background-color: $color-secondary-soft-dark;
    #{$self}__triangle-wrapper {
      opacity: 1;
    }
  }

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
