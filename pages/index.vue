<template lang="pug">
#home-page
  header.header
    h4.header__title piramidi.dental
    BaseMobileIconMenu(
      @open-mobile-menu="openMobileMenu")
  .tool-plx(ref="toolPlx")
    img(src="/images/dental-tool.svg" alt="dental-tool")
  section.home(ref="homeSection")
    p {{ restaurants }}
    p {{ restaurant }}
  section.terapies
    div(style="background-color: red; width: 100%; height: 200px;")
  footer

</template>

<script setup lang="ts">
import { DEFAULT_VALUES } from '@/constants'
import { useRestaurantsQuery, useRestaurantQuery } from '@/generated/operations'

// eslint-disable-next-line
// const { result } = await useRestaurantsQuery()

const toolPlx = ref<HTMLElement | null>(null)
const homeSection = ref<HTMLElement | null>(null)
const scrollEffects = ref<(HTMLElement | void)[]>([])

const windowWidth = useWindowWidth()
const { parallax, stylesEffect } = useScrollmagic()

const restaurants = ref<(object | void)[]>([])
const restaurant = ref<object>({})

const toolAnimationHandler = () : void => {
  if (toolPlx.value && homeSection.value) {
    const _toolHeight:number = toolPlx.value.offsetHeight
    const _homeHeight:number = homeSection.value.offsetHeight - DEFAULT_VALUES.MOBILE_HEADER
    const _toValue:number = (_toolHeight - _homeHeight) + DEFAULT_VALUES.PADOING_400

    const plxOption = ({
      dataTween: {
        fn: 'fromTo',
        el: '.tool-plx',
        from: { y: DEFAULT_VALUES.PADOING_400, duration: 1, ease: 'linear' },
        to: { y: -_toValue, duration: 1, ease: 'linear' }
      }
    })

    const stlOption = ({
      dataTween: {
        fn: 'fromTo',
        el: '.header__title',
        from: { css: { opacity: 0 }, ease: 'linear' },
        to: { css: { opacity: 1 }, ease: 'linear' }
      },
      offset: _homeHeight - DEFAULT_VALUES.MOBILE_HEADER,
      duration: DEFAULT_VALUES.MOBILE_HEADER
    })

    scrollEffects.value = [
      parallax(plxOption),
      stylesEffect(stlOption)
    ]
  }
}

const retriveRestaurants = async () => {
  const { result } = await useRestaurantsQuery()
  restaurants.value = result.value?.restaurants?.data || []
}

const retriveRestaurant = async () => {
  const { result } = await useRestaurantQuery({ id: '1' })
  restaurant.value = result.value?.restaurant?.data || {}
}

// eslint-disable-next-line
const openMobileMenu = () => {
  // console.log('mobile menu')
}

watch(windowWidth, () : void => {
  for (const effect of scrollEffects.value) { if (effect) { effect.remove() } }
  toolAnimationHandler()
})

await retriveRestaurants()
await retriveRestaurant()
</script>

<style lang="scss" scoped>
.tool-plx {
  position: absolute;
  height: 130vmax;
  left: $space-200;
  img {
    height: 100%;
    filter: drop-shadow($shadow-200);
  }
}

.header {
  position: fixed;
  height: $-mobile-header-height;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-200;
  mix-blend-mode: difference;
  z-index: 1;
  &__title {
    @include txt-title-300;
    color: $color-white;
    line-height: 0;
    opacity: 0;
  }
}
.home {
  height: calc(100vmax + #{$-mobile-header-height});
  // height: 100vmax;
  background-color: $color-secondary;
}
.terapies {
  height: rem(1380);
  background-color: $color-white;
  // margin-top: rem(-80);
}
footer {
  height: 100vmax;
  background-color: $color-secondary;
}
</style>
