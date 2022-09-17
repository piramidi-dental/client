<template lang="pug">
.wave-template(ref="testRef" :class="{ 'wave-template--before-mount': !appIsMounted }")
  .wave-template__wrapper
    .wave-template__shape-divider
    svg.wave-template__svg(viewBox="0 0 1200 120" preserveAspectRatio="none")
      path(id="wave-svg" :fill="secondaryColor" vector-effect="non-scaling-stroke" :d="SVG_SHAPE")
  .wave-template__inner
    transition(:name="componentTransition" mode="out-in")
      component(
        :is="dynamicComponent"
        :app-is-mounted="appIsMounted"
        @handle-mobile-menu="toggleMenu")
</template>

<script setup lang="ts">
import type { IWaveTypes } from '@/types/wave'
import {
  LOADING,
  DEFAULT_VALUES,
  TRANSITION,
  WAVE_TYPE
} from '@/constants'

const nuxtApp = useNuxtApp()
const { $gsap } = useNuxtApp()
const { addRemoveBodyClass } = useBodyClass()
const { isResponsiveSm } = useMediaResponsive()
const { mobileMenu, toggleMenu } = useMobileMenu()
const { setWaveType, waveController } = useWaveController()

const SVG_SHAPE = 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
const OVER_FLOW_CLASS = 'overflow-hidden'
const DEF_FINISH_TIMEOUT_VALUE = 500
const WAVE_HEIGHT = {
  MOBILE: 150,
  TABLET: 200
}

const waveTemplate = useState<boolean>('wave-template')

const tweenController = ref<GSAPTimeline | null>(null)
const tweenControllerInit = ref<GSAPTimeline | null>(null)
const tweenControllerNavBar = ref<GSAPTimeline | null>(null)

const appIsMounted = ref<boolean>(false)
const finishTimeout = ref<number>(DEF_FINISH_TIMEOUT_VALUE)
const componentTransition = ref<string>('')
const dynamicComponent = shallowRef(resolveComponent('LoadingSpinner'))
const secondaryColor = ref<string>('transparent')

const getWaveHeight = computed<string>(() => `${(!isResponsiveSm.value ? WAVE_HEIGHT.MOBILE : WAVE_HEIGHT.TABLET) / DEFAULT_VALUES.REM}rem`)

const setStyledColors = () : void => {
  const style = getComputedStyle(document.body)

  secondaryColor.value = style.getPropertyValue('--color-secondary')
}

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
    addRemoveBodyClass(OVER_FLOW_CLASS)
    dateStart.value = new Date()
    waveTemplate.value = true

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
    const _diffDate = LOADING.ANIMATION_DELAY - ((new Date()).getTime() - dateStart.value.getTime())
    const _timeoutValue = _diffDate > 0 && waveController.value.type === WAVE_TYPE.LOADING ? _diffDate : 0

    setTimeout(() => {
      progress.value = 100
      _hide()
    }, _timeoutValue)
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
      }, finishTimeout.value)
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
    addRemoveBodyClass(OVER_FLOW_CLASS, true)
    waveTemplate.value = false
    if (!appIsMounted.value) { appIsMounted.value = true }
    if (waveController.value.type === WAVE_TYPE.MENU) {
      animationActionsHandler([tweenControllerNavBar.value, 'reverse'])
    }
    if (mobileMenu.value.isOpen) {
      toggleMenu()
      componentTransition.value = ''
    }
  }, LOADING.WAVE_DURATION)
}

const animationHandler = () : void => {
  nextTick(() => {
    const _tween = $gsap.timeline({ paused: true })

    _tween.to('.wave-template', { display: 'block', duration: 0 })

    _tween.to('.wave-template__shape-divider', { css: { height: '100%' }, ease: 'easeIn', duration: 0.5 })
    _tween.to('.wave-template__svg', { css: { height: getWaveHeight.value }, ease: 'easeIn', duration: 0.3 }, '<')
    _tween.to('.wave-template__svg', { css: { height: 0 }, ease: 'easeOut', duration: 0.2 }, '-=0.2')
    _tween.to('.wave-template__inner', { opacity: 1, ease: 'easeOut', duration: 0.3 }, '-=0.3')

    tweenController.value = _tween
  })
}

const initAnimationHandler = () => {
  nextTick(() => {
    const _tween = $gsap.timeline({ paused: true })

    _tween.to('.wave-template__shape-divider', { css: { height: 0 }, ease: 'easeIn', duration: 0.5 })
    _tween.to('.wave-template__inner', { opacity: 0, ease: 'easeOut', duration: 0.3 }, '<')
    _tween.to('.wave-template__svg', { css: { height: getWaveHeight.value }, ease: 'easeIn', duration: 0.2 }, '<')
    _tween.to('.wave-template__svg', { css: { height: 0 }, ease: 'easeOut', duration: 0.3 }, '-=0.3')

    _tween.to('.wave-template', { display: 'none', duration: 0 })

    tweenControllerInit.value = _tween
  })
}

const navBarAnimation = () => {
  nextTick(() => {
    const _tween = $gsap.timeline({ paused: true })

    _tween.to('.nav-bar', { css: { zIndex: 3 }, ease: 'easeIn', duration: 0.3 })

    tweenControllerNavBar.value = _tween
  })
}

const setLoadingConfig = () => {
  dynamicComponent.value = resolveComponent('LoadingSpinner')
  finishTimeout.value = DEF_FINISH_TIMEOUT_VALUE
}

const indicator = useLoadingIndicator({
  duration: 2000,
  throttle: 200
})

onMounted(async () => {
  await setStyledColors()
  await initAnimationHandler()
  await navBarAnimation()
  await animationHandler()

  indicator.start()
})
onBeforeUnmount(indicator.clear)

watch(() => waveController.value.isActive, (val: boolean) => {
  if (waveController.value.type === WAVE_TYPE.LOADING) {
    setLoadingConfig()
  } else {
    dynamicComponent.value = resolveComponent('MobileMenu')
    finishTimeout.value = 0
    $gsap.to('.nav-bar__logo-box', { opacity: 1, duration: 0 })
    animationActionsHandler([tweenControllerNavBar.value, 'play'])
  }

  indicator[val ? 'start' : 'finish']()
})

nuxtApp.hook('page:start', () => {
  setLoadingConfig()
  setWaveType((WAVE_TYPE.LOADING as IWaveTypes))

  if (mobileMenu.value.isOpen) {
    componentTransition.value = TRANSITION.FADE
    animationActionsHandler([tweenControllerNavBar.value, 'reverse'])
  }

  indicator.start()
})
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
  z-index: 2;

  &--before-mount {
    display: block;
    #{$self}__shape-divider {
      height: 100%;
    }
    #{$self}__inner {
      opacity: 1;
    }
  }

  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  &__shape-divider {
    height: 0;
    position: relative;
    background-color: $color-secondary;
  }

  &__svg {
    position: relative;
    display: block;
    height: 0;
    margin-top: rem(-1);
    width: calc(201% + 1.3px);
  }

  &__inner {
    opacity: 0;
  }
}
</style>
