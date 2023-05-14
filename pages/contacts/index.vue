<script setup lang="ts">
import type { Clinic } from '@/types/contacts'
import { Pages, ClinicsItemMode } from '@/types/enums'

definePageMeta({
  title: Pages.Contacts
})

const { retriveClinicsData, clinicsList, getContactEmail, getOpeningHours } = useContacts()

if (!clinicsList.value.length) { await retriveClinicsData() }
</script>

<template lang="pug">
.contacts
  page-cover
    .contacts__container
      p.pages__description {{ getOpeningHours }}
      ul.contacts-list
        li.contacts__card(v-for="clinic in clinicsList" :key="clinic.attributes.uuid")
          ui-ds-card
            clinic-item(
              :clinic-attr="clinic.attributes"
              :mode="ClinicsItemMode.Card")
</template>

<style lang="scss" scoped>
// .clinic {}
</style>
