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
    p.ds-component__row-description(v-if="item.attributes.description") {{ item.attributes.description }}
</template>

<style lang="scss" scoped>
.ds-table {
  @include mediaLg {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    li:nth-child(odd) {
      padding-right: $space-100;
    }

    li:nth-child(even) {
      padding-left: $space-100;
    }
  }
}
</style>
