<template lang="pug">
div
  h1 terapies
  button(@click="navigateToHome") Home
  button(@click="mockAction") Mock action
</template>

<script setup lang="ts">
import { useRestaurantsQuery, useRestaurantQuery } from '@/generated/operations'
import { useLoadingStore } from '@/stores/loading'

useHead({
  title: 'Servizi e terapie'
})
definePageMeta({
  title: 'Terapies',
  loadingText: 'Servizi e terapie',
  pageTransition: {
    mode: 'default'
  },
  middleware: ['loading-text']
})

const restaurants = ref<object[]>([])
const restaurant = ref<object>({})
const loadingStore = useLoadingStore()

const retriveData = async () => {
  try {
    const { result } = await useRestaurantsQuery()

    restaurants.value = result.value?.restaurants?.data || []
    console.log(restaurants.value)
  } catch (error) {
    console.log('catch')
    console.error(error)
  }
}

const retriveRestaurant = async () => {
  try {
    const { result } = await useRestaurantQuery({ id: '1' })
    restaurant.value = result.value?.restaurant?.data || {}
    console.log(restaurant.value)
  } catch (error) {
    console.log('catch')
    console.error(error)
  }
}

// eslint-disable-next-line
const navigateToHome = () => {
  navigateTo({ path: '/' })
}

// eslint-disable-next-line
const mockAction = async () => {
  loadingStore.activationHandler(true)
  loadingStore.setTextHandler('Caricando...')

  await usePageDelay()
  loadingStore.activationHandler(false)
}

await usePageDelay()
await retriveData()
await retriveRestaurant()
</script>
