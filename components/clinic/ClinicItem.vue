<template lang="pug">
.clinic-item
  h4 {{ clinicAttr.name }}
  div(v-html="clinicAttr.address")
  clinic-phones-list(:clinic-attr="clinicAttr")
  ui-ds-link(
    :to="clinicAttr.map"
    :name="$t('contacts.viewMap')"
    type="tertiary"
    size="small"
    target="_blank"
    arrow-icon)
</template>

<script setup lang="ts">
defineProps({
  clinicAttr: {
    type: Object,
    required: true
  }
})
</script>
