<template lang="pug">
button(@click="handleError") Clear errors
</template>

<script setup lang="ts">
const errorProps = defineProps({
  error: {
    type: Object,
    required: true
  }
})

useHead({
  title: 'Error'
})

console.log(errorProps.error)

const handleError = () => clearError({ redirect: '/' })
</script>
