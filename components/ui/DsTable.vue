
<script setup lang="ts">
defineProps({
  componentData: {
    type: Array,
    required: true
  }
})
</script>

<template lang="pug">
.ds-table
  .ds-table__item(v-for="item in componentData" :key="item.id")
    h3.ds-table__item-title {{ item.attributes.name }}
    p.ds-table__item-description(v-if="item.attributes.description") {{ item.attributes.description }}
</template>

<style lang="scss" scoped>
.ds-table {
  &__item {
    padding: $space-150 0;
    border-bottom: $border-size-200 solid $color-hard-neutral;
    &-title {
      @include txt-title-300;
      @include mediaSm {
        @include txt-title-400;
      }
    }
    &-description {
      @include txt-title-200;
      color: $color-neutral;
      @include mediaSm {
        @include txt-title-300;
        padding-top: $space-100;
      }
    }
  }
}
</style>
