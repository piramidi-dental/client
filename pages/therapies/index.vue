<script setup lang="ts">
import { TherapiesSections } from '@/types/enums'

const { t } = useLang()
// const { handleWaveActivation } = useWaveController()

useHead({
  title: t('pages.therapies')
})

definePageMeta({
  title: 'therapies'
})

// const mockAction = async () => {
//   handleWaveActivation({ isActive: true, loadingText: 'Caricando...' })

//   await usePageDelay()
//   handleWaveActivation({ isActive: false })
// }

</script>

<template lang="pug">
.therapies
  page-cover
    .therapies__sections
      div(v-for="item in Object.values(TherapiesSections)" :key="item")
        section-list(
          :section-name="item"
          is-title-visible)
</template>

<style lang="scss" scoped>
.therapies {
  &__sections {
    padding-top: $space-200;
    display: flex;
    flex-direction: column;
    row-gap: $space-600;

    @include mediaSm {
      padding-top: $space-500;
      row-gap: $space-900;
    }

    @include mediaMd {
      padding-top: $space-600;
      row-gap: $space-600;
    }

    :deep(.pages__subtitle) {
      margin-bottom: $space-200;

      @include mediaSm {
        margin-bottom: $space-300;
      }
    }
  }
}
</style>
