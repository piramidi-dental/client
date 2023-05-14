
<template lang="pug">
.ds-card
  slot
</template>

<style lang="scss">
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
