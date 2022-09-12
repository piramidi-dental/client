<template lang="pug">
button(@click="handleError") Clear errors
</template>

<script setup lang="ts">
useHead({
  title: 'Error'
})

const error = useError()

console.log(error)

const handleError = () => clearError({ redirect: '/' })
</script>
