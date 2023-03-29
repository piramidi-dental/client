<script setup lang="ts">
defineProps({
  componentData: {
    type: Array,
    required: true
  }
})
</script>

<template lang="pug">
ul.ds-component
  li.ds-component__row(v-for="item in componentData" :key="item.id")
    h3.ds-component__row-title {{ item.attributes.name }}
    p.ds-component__row-description(v-if="item.attributes.description") {{ item.attributes.description }}
</template>
