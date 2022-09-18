<template lang="pug">
.clinic-item
  h4 {{ clinicAttr.name }}
  div(v-html="clinicAttr.address")
  ClinicPhonesList(:clinic-attr="clinicAttr")
  UiDsLink(
    :to="clinicAttr.map"
    :name="$t('contacts.viewMap')"
    type="tertiary"
    size="small"
    target="_blank"
    arrow-icon)
</template>

<script setup lang="ts">
const clinicProps = defineProps({
  clinicAttr: {
    type: Object,
    required: true
  }
})
</script>
