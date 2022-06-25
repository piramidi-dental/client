<template lang="pug">
div.first-test
  h1 hola
  p {{ title }} 
  //- img(src="~/assets/images/client_logo-circle.svg")
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
  h1 {
    font-size: 32px;
  }
}
</style>