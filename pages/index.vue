<template lang="pug">
.home-page
  header.header
    h4.header__title(ref="headerTitle") piramidi.dental
    UiMobileIconMenu(
      @open-mobile-menu="openMobileMenu")
  .home-page__dental-tool(ref="dentalTool")
    img(src="/images/dental-tool.svg" alt="dental-tool")
  section.home-page__main(ref="mainSection")
  section.home-page__terapies
    div(style="background-color: red; width: 100%; height: 200px;")
    NuxtLink(to="/terapies") Terapies
  footer

</template>

<script setup lang="ts">
import { DEFAULT_VALUES } from '@/constants'
import { useRestaurantsQuery, useRestaurantQuery } from '@/generated/operations'

useHead({
  title: 'Home'
})

definePageMeta({
  title: 'Home',
  pageTransition: {
    mode: 'default'
  }
})

const dentalTool = ref<HTMLElement | null>(null)
const mainSection = ref<HTMLElement | null>(null)
const scrollEffects = ref<(HTMLElement | void)[]>([])

const windowWidth = useWindowWidth()
const { parallax, stylesEffect } = useScrollmagic()

const restaurants = ref<(object | void)[]>([])
const restaurant = ref<object>({})

const scrollAnimationsHandler = () : void => {
  for (const effect of scrollEffects.value) { if (effect) { effect.remove() } }

  nextTick(() => {
    if (dentalTool.value && mainSection.value) {
      const _dentalToolHeight:number = dentalTool.value.offsetHeight
      const _mainHeight:number = mainSection.value.offsetHeight - DEFAULT_VALUES.MOBILE_HEADER
      const _toValue:number = (_dentalToolHeight - _mainHeight) + DEFAULT_VALUES.PADOING_400

      const plxOption = ({
        dataTween: {
          fn: 'fromTo',
          el: '.home-page__dental-tool',
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
        offset: _mainHeight - DEFAULT_VALUES.MOBILE_HEADER,
        duration: DEFAULT_VALUES.MOBILE_HEADER
      })

      scrollEffects.value = [
        parallax(plxOption),
        stylesEffect(stlOption)
      ]
    }
  })
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

watch(windowWidth, scrollAnimationsHandler)

onMounted(scrollAnimationsHandler)

await retriveRestaurants()
await retriveRestaurant()
</script>

<style lang="scss" scoped>
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
.home-page {
  &__dental-tool {
    position: absolute;
    height: 130vmax;
    left: $space-200;
    img {
      height: 100%;
      filter: drop-shadow($shadow-200);
    }
  }
  &__main {
    height: calc(100vmax + #{$-mobile-header-height});
    background-color: $color-secondary;
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
