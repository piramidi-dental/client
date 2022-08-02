<template lang="pug">
.terapies
  h1 terapies
  button(@click="navigateToHome") Home
  button(@click="mockAction") Mock action
</template>

<script setup lang="ts">
// import { useRestaurantsQuery, useRestaurantQuery } from '@/generated/operations'
import { useLoadingStore } from '@/stores/loading'
import { LOADING } from '@/constants'

useHead({
  title: 'Servizi e terapie'
})

definePageMeta({
  title: 'Terapies',
  loadingText: 'Servizi e terapie',
  pageTransition: {
    mode: 'default',
    duration: LOADING.ANIMATION_DELAY
  },
  middleware: ['loading-text']
})

// const restaurants = ref<object[]>([])
// const restaurant = ref<object>({})
const loadingStore = useLoadingStore()

const retriveData = async () => {
  try {
    // const { result } = await useRestaurantsQuery()

    // restaurants.value = result.value?.restaurants?.data || []
    // console.log(restaurants.value)
    // const { data: restaurants } = await useFetch('http://localhost:1337/api/restaurants')
    const { data: restaurants } = await useCustomFetch('/api/restaurants', { key: 'restaurants' })
    console.log(restaurants.value)
  } catch (error) {
    console.log('catch')
    console.error(error)
  }
}

const retriveRestaurant = async () => {
  try {
    const { data: restaurant } = await useCustomFetch(`/api/restaurants/${1}`, { key: 'restaurant' })
    // const { result: restaurantResult } = await useRestaurantQuery({ id: '1' })
    // await usePageDelay()
    // restaurant.value = restaurantResult.value?.restaurant?.data || {}
    console.log(restaurant.value)
  } catch (error) {
    console.log('catch')
    console.error(error)
  }
}

const navigateToHome = () => {
  navigateTo({ path: '/' })
}

const mockAction = async () => {
  loadingStore.activationHandler(true)
  loadingStore.setTextHandler('Caricando...')

  await usePageDelay()
  loadingStore.activationHandler(false)
}

// await usePageDelay()
await retriveData()
await retriveRestaurant()
</script>

<style lang="scss" scoped>
.terapies {
  min-height: 100vmax;
}
</style>
