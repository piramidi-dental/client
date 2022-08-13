<template lang="pug">
button(@click="handleError") Clear errors
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

useHead({
  title: 'Error'
})

console.log(props.error)

const handleError = () => clearError({ redirect: '/' })
</script>
