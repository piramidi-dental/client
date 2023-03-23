<script setup lang="ts">
const props = defineProps({
  componentData: {
    type: Array,
    required: true
  },

  componentType: {
    type: String,
    required: true
  }
})

const getComponent = computed(() => {
  const components = {
    accordeon: '',
    list: '',
    table: resolveComponent('UiDsTable')
  }

  return components[props.componentType as componentType]
})
</script>

<template lang="pug">
component(:is="getComponent" :component-data="componentData")
</template>
