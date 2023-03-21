
<script setup lang="ts">
defineProps({
  tableData: {
    type: Array,
    required: true
  }
})
</script>

<template lang="pug">
.ds-table
  .ds-table__item(v-for="item in tableData" :key="item.id")
    h3 {{ item.attributes.name }}
    p(v-if="item.attributes.description") {{ item.attributes.description }}
</template>

<style lang="scss" scoped>
.ds-table {
  &__item {
    padding: $space-150 0;
    border-bottom: $border-size-200 solid $color-hard-neutral;
  }
}
</style>
