<template lang="pug">
.terapies
  h1 terapies
  button(@click="navigateToHome") Home
  button(@click="mockAction") Mock action
</template>

<script setup lang="ts">
// import { useRestaurantsQuery, useRestaurantQuery } from '@/generated/operations'
import { Loading } from '@/types/enums'

const { find, findOne } = useStrapi4()
const { t } = useLang()
const { handleWaveActivation } = useWaveController()

useHead({
  title: t('pages.terapies')
})

definePageMeta({
  title: 'Terapies',
  loadingText: 'terapies',
  pageTransition: {
    mode: 'default',
    duration: Loading.AnimationDelay
  },
  middleware: ['loading-text']
})

// const restaurants = ref<object[]>([])
// const restaurant = ref<object>({})

const retriveData = async () => {
  try {
    const { data: restaurants, error } = await useAsyncData('restaurants', () => find('restaurants'))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }
  } catch (error) {
    showError(error as IRequestError)
  }
}

const retriveRestaurant = async () => {
  try {
    const { data: restaurant, error } = await useAsyncData('restaurant', () => findOne('restaurants', 1))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }
  } catch (error) {
    showError(error as IRequestError)
  }
}

const navigateToHome = () => {
  navigateTo({ path: '/' })
}

const mockAction = async () => {
  handleWaveActivation({ isActive: true, loadingText: 'Caricando...' })

  await usePageDelay()
  handleWaveActivation({ isActive: false })
}

// await usePageDelay()
await retriveData()
await retriveRestaurant()
</script>

<style lang="scss" scoped>
.terapies {
  @include viewport-height;
  padding-top: rem(56);
  background-color: white;
}
</style>
