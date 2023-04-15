<script setup lang="ts">
defineProps({
  componentData: {
    type: Array,
    required: true
  }
})
</script>

<template lang="pug">
ul.ds-component.ds-table
  li.ds-component__row(v-for="item in componentData" :key="item.id")
    h3.ds-component__row-title {{ item.attributes.name }}
    p.ds-component__row-description.ds-table__description(v-if="item.attributes.description") {{ item.attributes.description }}
</template>

<style lang="scss" scoped>
.ds-table {
  &__description {
    @include mediaSm {
      padding-top: $space-100;
    }
  }
}
</style>
