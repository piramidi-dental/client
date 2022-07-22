<template>
  <div>
    <LoadingSpinner />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk: string) : string => {
    return titleChunk ? `${titleChunk} - piramidi.dental` : 'piramidi.dental'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'google', content: 'notranslate' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>
