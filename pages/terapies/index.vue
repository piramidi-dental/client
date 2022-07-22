<template lang="pug">
div
  h1 terapies
  nuxt-link(to="/") home
</template>

<script setup>
import { useRestaurantsQuery } from '@/generated/operations'

useHead({
  title: 'Servizi e terapie'
})

const restaurants = ref([])

const retriveData = async () => {
  try {
    const { result } = await useRestaurantsQuery()
    await new Promise(resolve => setTimeout(resolve, 2000))

    restaurants.value = result.value?.restaurants?.data || []
    console.log(restaurants.value)
  } catch (error) {
    console.error(error)
  }
}

await retriveData()

</script>
