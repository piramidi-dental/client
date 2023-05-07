<script lang="ts" setup>
defineProps({
  cardData: {
    type: Object,
    required: true
  }
})
</script>

<template lang="pug">
.ds-card
  h3.ds-card__title {{ cardData.name }}
  p.ds-card__description {{ cardData.description }}
  p.ds-card__text {{ cardData.text }}
</template>

<style lang="scss" scoped>
.ds-card {
  padding: $space-100;
  border: $border-size-200 solid $color-hard-neutral;
  border-radius: $radius-200;

  @include mediaSm {
    padding: $space-150;
  }

  &__title {
    @include txt-title-300;
    @include mediaSm {
      @include txt-title-400;
    }
  }
  &__description {
    @include txt-body-600;
    color: $color-neutral;
    @include mediaSm {
      @include txt-title-300;
    }
  }
  &__text {
    @include txt-body-500;
    @include mediaSm {
      @include txt-title-300;
    }
  }

  &__description,
  &__text {
    @include text-space-wrap;
  }
}
</style>
