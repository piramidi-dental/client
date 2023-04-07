<script setup lang="ts">
const { t } = useLang()
const route = useRoute()
const { $composeImageUri } = useNuxtApp()

const pageName = route.meta.title as string
const coverPage = await useCoverPage(pageName)

const getCoverImage = computed(() => ({
  url: $composeImageUri(coverPage?.url as string),
  alt: coverPage?.alternativeText
}))
</script>

<template lang="pug">
.page-cover
  .page-cover__header
    img(:src="getCoverImage.url" :alt="getCoverImage.alt")
  .page-cover__body
    div
      h2.pages__title {{ t(`pages.${pageName}`) }}
      slot
</template>

<style lang="scss" scoped>
.page-cover {
  background-color: $color-white;
  overflow: hidden;

  &__header {
    height: calc(#{$-mobile-cover-image} + #{$-mobile-header-height});

    @include mediaSm {
      height: calc(#{$-cover-image} + #{$-header-height});
    }

    &::before {
      content: "";
      height: $-mobile-header-height;
      width: 100%;
      display: block;
      background-color: $color-secondary;

      @include mediaSm {
        height: $-header-height;
      }
    }

    img {
      height: $-mobile-cover-image;
      width: 100%;
      object-fit: cover;

      @include mediaSm {
        height: $-cover-image;
      }
    }
  }

  &__body {
    padding: $space-400 $space-200 $space-900;

    @include mediaSm {
      padding: $space-500 $space-400 $space-1000;
    }

    @include mediaMd {
      padding: $space-600 $space-400 $space-1000;

      > div {
        margin: 0 auto;
        max-width: $breakpoint-400;
      }
    }
  }
}
</style>