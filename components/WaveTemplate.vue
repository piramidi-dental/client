<template lang="pug">
.wave-template(ref="testRef" :class="{ 'wave-template--before-mount': !appIsMounted }")
  svg.wave-template__svg(viewBox="0 0 100 100" preserveAspectRatio="none")
    path(id="wave-svg" :fill="svgValues.fill" vector-effect="non-scaling-stroke" :d="svgValues.shape")
  component.wave-template__inner(
    :is="getDynamicComponent"
    :app-is-mounted="appIsMounted")
    //- :trigger-counter="triggerCounter")
</template>

<script setup lang="ts">
import { LOADING } from '@/constants'

const nuxtApp = useNuxtApp()
const { $gsap, $globalUtils } = useNuxtApp()
const { addRemoveBodyClass } = useBodyClass()

const svgShapes = [
  'M 0 100 V 100 Q 50 100 100 100 V 100 z',
  'M 0 100 V 50 Q 50 0 100 50 V 100 z',
  'M 0 100 V 0 Q 50 0 100 0 V 100 z'
]
const overFlowClass = 'overflow-hidden'

const loadingView = useState<ILoading>('loading-view')

const tweenControllerInit = ref<GSAPTimeline | null>(null)
const tweenController = ref<GSAPTimeline | null>(null)
const appIsMounted = ref<boolean>(false)
// const triggerCounter = ref<string>('')
const stylesColors = reactive<IStringItem>({ softDark: '', hardDark: '' })

const svgValues = computed<IStringItem>(() => appIsMounted.value
  ? { shape: svgShapes[0], fill: svgColor('hardDark') }
  : { shape: svgShapes[2], fill: svgColor('softDark') }
)

const getDynamicComponent = computed(() => resolveComponent('LoadingSpinner'))

const setStyledColors = () : void => {
  const style = getComputedStyle(document.body)

  for (const color in stylesColors) {
    stylesColors[color] = style.getPropertyValue(`--color-secondary-${$globalUtils.kebabToDashesConverter(color)}`)
  }
}

const svgColor = (colorName: string) : string => stylesColors[colorName] || 'transparent'

const useLoadingIndicator = (opts: {
  duration: number,
  throttle: number
}) => {
  const progress = ref(0)
  const dateStart = ref<Date>(new Date())
  const step = computed(() => 10000 / opts.duration)

  let _timer: any = null // eslint-disable-line
  let _throttle: any = null // eslint-disable-line

  const start = () => {
    clear()
    progress.value = 0
    addRemoveBodyClass(overFlowClass)
    dateStart.value = new Date()

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
    const _diffDate = LOADING.PAGE_DELAY - ((new Date()).getTime() - dateStart.value.getTime())
    const _timeoutValue = _diffDate > 0 ? _diffDate : 0

    progress.value = 100

    setTimeout(() => { _hide() }, _timeoutValue)
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
  if (_controller) {
    _controller[actionType]()
    // triggerCounter.value = actionType
  }
}

const handleAnimationComplete = () => {
  setTimeout(() => {
    addRemoveBodyClass(overFlowClass, true)
    if (!appIsMounted.value) {
      appIsMounted.value = true
      // triggerCounter.value = ''
    }
  }, LOADING.ANIMATION_DELAY)
}

const animationHandler = () : void => {
  nextTick(() => {
    const _tween = $gsap.timeline({ paused: true })

    _tween.to('.wave-template', { display: 'block' })

    _tween.to('#wave-svg', { attr: { d: svgShapes[1] }, ease: 'easeIn', duration: 0.5 }, '<')
    _tween.to('#wave-svg', { attr: { d: svgShapes[2] }, ease: 'easeOut', duration: 0.5, fill: stylesColors.softDark })
    _tween.to('.wave-template__inner', { opacity: 1, ease: 'easeOut', duration: 0.5 }, '<-0.3')
    _tween.to('.wave-template', { css: { backgroundColor: stylesColors.softDark } })

    tweenController.value = _tween
  })
}

const initAnimationHandler = () => {
  nextTick(() => {
    const _tween = $gsap.timeline({ paused: true })

    _tween.to('.wave-template', { css: { backgroundColor: 'transparent' } })
    _tween.to('#wave-svg', { attr: { d: svgShapes[1] }, ease: 'easeOut', duration: 0.5 })
    _tween.to('#wave-svg', { attr: { d: svgShapes[0] }, ease: 'easeIn', duration: 0.5, fill: stylesColors.hardDark })
    _tween.to('.wave-template__inner', { opacity: 0, ease: 'easeOut', duration: 0.5 }, '<-0.3')
    _tween.to('.wave-template', { display: 'none' })

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
onBeforeUnmount(indicator.clear)

watch(() => loadingView.value.isActive, (val: boolean) => {
  indicator[val ? 'start' : 'finish']()
})

nuxtApp.hook('page:start', indicator.start)
nuxtApp.hook('page:finish', indicator.finish)

</script>

<style lang="scss" scoped>
.wave-template {
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
  }

  &__svg {
    position: absolute;
    width: 150%;
    height: 100%;
    left: -25%;
    top: 0;
    transform: rotate(180deg);
    @include mediaMd {
      width: 100%;
      left: 0;
    }
  }
}
</style>
