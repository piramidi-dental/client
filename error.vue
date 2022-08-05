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

console.log(props.error.message)

const handleError = () => clearError({ redirect: '/' })
</script>
