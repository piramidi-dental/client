<script setup lang="ts">
import { TherapiesSections } from '@/types/enums'

const { t } = useLang()
const coverPage = await useCoverPage('therapies')
const { $composeImageUri } = useNuxtApp()
// const { handleWaveActivation } = useWaveController()

useHead({
  title: t('pages.therapies')
})

definePageMeta({
  title: 'therapies'
})

const getCoverImage = computed(() => ({
  url: $composeImageUri(coverPage?.url as string),
  alt: coverPage?.alternativeText
}))

// const mockAction = async () => {
//   handleWaveActivation({ isActive: true, loadingText: 'Caricando...' })

//   await usePageDelay()
//   handleWaveActivation({ isActive: false })
// }

</script>

<template lang="pug">
.therapies
  .pages__cover-image
    img(:src="getCoverImage.url" :alt="getCoverImage.alt")
  .therapies__body
    h2.pages__title {{ t('pages.therapies') }}
    section-list(
      v-for="item in Object.values(TherapiesSections)"
      :key="item"
      :section-name="item"
      is-title-visible)
</template>

<style lang="scss" scoped>
.therapies {
  background-color: $color-white;
  overflow: hidden;
  &__body {
    padding: $space-400 $space-200 $space-900;
  }
}
</style>
