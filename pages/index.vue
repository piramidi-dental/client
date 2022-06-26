<template lang="pug">
div.first-test
  h1 Out-of-the-box, Nuxt provides good default values for charset and viewport meta tags, but you can override these if you need to, as well as customize other meta tags for your site in several different ways.
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
    @include txt-body-600;
    color: $color-primary;
  }
}
</style>