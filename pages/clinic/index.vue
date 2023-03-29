<script setup lang="ts">
const { t } = useLang()
const coverPage = await useCoverPage('clinic')
const { $composeImageUri } = useNuxtApp()

useHead({
  title: t('pages.clinic')
})

definePageMeta({
  title: 'clinic'
})

const getCoverImage = computed(() => ({
  url: $composeImageUri(coverPage?.url as string),
  alt: coverPage?.alternativeText
}))
</script>

<template lang="pug">
.therapies
  header
    .pages__cover-image
      img(:src="getCoverImage.url" :alt="getCoverImage.alt")
  main.therapies__main
    h2.pages__title {{ t('pages.clinic') }}
</template>

<style lang="scss" scoped>
.clinic {
  background-color: $color-white;
  &__main {
    padding: $space-400 $space-200 $space-900;
  }
}
</style>
