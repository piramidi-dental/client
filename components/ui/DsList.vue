<script setup lang="ts">
defineProps({
  componentData: {
    type: Array,
    required: true
  }
})
</script>

<template lang="pug">
ul.ds-list
  li(v-for="item in componentData" :key="item.attributes.uuid") {{ item.attributes.name }}
</template>

<style lang="scss" scoped>
.ds-list {
  @include txt-body-600;
  list-style-type: disc;
  list-style-position: outside;
  padding-left: $space-300;

  @include mediaSm {
    @include txt-title-300;
  }

  li + li {
    margin-top: $space-050;

    @include mediaSm {
      margin-top: $space-100;
    }

    @include mediaMd {
      margin-top: $space-150;
    }
  }
}
</style>
