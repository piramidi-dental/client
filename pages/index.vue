<template lang="pug">
div.first-test
  h1 hola
  p {{ title }} 
  img(src="/images/client_logo-circle.svg")
  button(@click="addTitle('Lara')") press button
</template>

<script setup lang="ts">
const title = ref('')

const addTitle = (name: string) => {
  title.value = name
}
</script>


<style lang="scss" scoped>
.first-test {
  margin: $space-400;
  h1 {
    @include txt-title-400;
    color: $color-primary;
  }
}
</style>