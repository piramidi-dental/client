<script setup lang="ts">
import { Pages, TherapiesSections } from '@/types/enums'

definePageMeta({
  title: Pages.Therapies
})
</script>

<template lang="pug">
.therapies
  page-cover
    .therapies__container
      div(v-for="item in Object.values(TherapiesSections)" :key="item")
        section-list(
          :section-name="item"
          is-title-visible)
</template>

<style lang="scss" scoped>
.therapies {
  &__container {
    padding-top: $space-200;

    @include mediaSm {
      padding-top: $space-500;
    }

    @include mediaMd {
      padding-top: $space-600;
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
