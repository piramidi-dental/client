<template lang="pug">
.home-page
  .home-page__dental-tool(ref="dentalTool")
    img(src="/images/dental-tool.svg" alt="dental-tool")
  section.home-page__main(ref="mainSection")
  section.home-page__terapies
    div(style="background-color: red; width: 100%; height: 200px;")
    button(@click="navigateToTerapies") Terapies
  footer

</template>

<script setup lang="ts">
import { createError } from 'h3'
import {
  DEFAULT_VALUES,
  LOADING,
  NAV_HEADER
} from '@/constants'

useHead({
  title: 'Home'
})

definePageMeta({
  title: 'Home',
  loadingText: 'Home',
  pageTransition: {
    mode: 'default',
    duration: LOADING.ANIMATION_DELAY
  },
  middleware: ['loading-text']
})

const { windowWidth } = useWindowWidth()
const { parallax, stylesEffect } = useScrollmagic()

const waveTemplate = useState<boolean>('wave-template')

const pageIsMounted = ref<boolean>(false)
const dentalTool = ref<HTMLElement | null>(null)
const mainSection = ref<HTMLElement | null>(null)
const scrollEffects = ref<(HTMLElement | void)[]>([])

const restaurants = ref<(object | void)[]>([])
const restaurant = ref<object>({})

const scrollAnimationsHandler = () : void => {
  resetAnimation()

  nextTick(() => {
    if (dentalTool.value && mainSection.value) {
      const _dentalToolHeight:number = dentalTool.value.offsetHeight
      const _dentalToolTop:number = DEFAULT_VALUES.PADDING_200 + DEFAULT_VALUES.PADDING_400
      const _mainHeight:number = mainSection.value.offsetHeight - NAV_HEADER.MOBILE
      const _toValue:number = (_dentalToolHeight - _mainHeight) + _dentalToolTop

      const plxOption = ({
        dataTween: {
          fn: 'fromTo',
          el: '.home-page__dental-tool',
          from: { y: _dentalToolTop, duration: 1, ease: 'linear' },
          to: { y: -_toValue, duration: 1, ease: 'linear' }
        }
      })

      const stlOption = ({
        dataTween: {
          fn: 'fromTo',
          el: '.nav-bar__logo-box',
          from: { opacity: 0, ease: 'linear' },
          to: { opacity: 1, ease: 'linear' }
        },
        offset: _mainHeight - NAV_HEADER.MOBILE,
        duration: NAV_HEADER.MOBILE
      })

      scrollEffects.value = [
        parallax(plxOption),
        stylesEffect(stlOption)
      ]
    }
  })
}

const resetAnimation = () => {
  for (const effect of scrollEffects.value) { if (effect) { effect.remove() } }
}

const retriveRestaurants = async () => {
  try {
    const { data: restaurants, error } = await useCustomFetch('/api/restaurants', { key: 'restaurants' })

    if (error.value) {
      throw createError({})
    }

    console.log(restaurants.value)
  } catch (error) {
    throwError(error as Error)
  }
}

const retriveRestaurant = async () => {
  try {
    const { data: restaurant, error } = await useCustomFetch(`/api/restaurants/${1}`, { key: 'restaurant' })

    if (error.value) {
      throw createError({})
    }

    console.log(restaurant.value)
  } catch (error) {
    throwError(error as Error)
  }
}

const navigateToTerapies = () => {
  navigateTo({ path: '/terapies' })
}

watch(windowWidth, () => {
  if (pageIsMounted.value && !waveTemplate.value) { scrollAnimationsHandler() }
})
watch(waveTemplate, (val) => {
  if (!val) { scrollAnimationsHandler() }
})

onMounted(() => {
  pageIsMounted.value = true
  scrollAnimationsHandler()
})
onUnmounted(resetAnimation)

await retriveRestaurants()
await retriveRestaurant()
</script>

<style lang="scss" scoped>
.home-page {
  &__dental-tool {
    position: absolute;
    height: 130vmax;
    left: $space-200;
    img {
      height: 100%;
      filter: drop-shadow($shadow-200);
    }
    @include mediaSm {
      left: $space-400;
    }
  }
  &__main {
    height: calc(100vmax + #{$-mobile-header-height});
    background-color: $color-secondary;
    // @include mediaSm {
    //   height: calc(100vmax + #{$-tablet-header-height});
    // }
  }
  &__terapies {
    height: rem(1380);
    background-color: $color-white;
  }
}
footer {
  height: 100vmax;
  background-color: $color-secondary;
}
</style>
