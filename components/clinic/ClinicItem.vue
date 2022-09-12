<template lang="pug">
.clinic-item
  h4 {{ clinicAttr.name }}
  div(v-html="clinicAttr.address")
  ul
    li(v-for="item in phonesList" :key="item")
      div(
        v-if="clinicAttr[item]"
        :class="{ 'clinic-item__mobile': isMobile(item) }")
        UiDsLink(
          :to="`${phoneLink(item)}+39${clinicAttr[item]}`"
          size="small"
          :name="$phoneFormatter[item](clinicAttr[item])")
        img(v-if="isMobile(item)" src="images/whatsapp-logo.svg" alt="whatsapp")
  UiDsLink(
    :to="clinicAttr.map"
    :name="$t('contacts.viewMap')"
    type="tertiary"
    size="small"
    target="_blank"
    arrow-icon)
</template>

<script setup lang="ts">
import type { IClinicPhone } from '@/types/contacts'

const clinicProps = defineProps({
  clinicAttr: {
    type: Object,
    required: true
  }
})

const { $phoneFormatter } = useNuxtApp()
const phonesList:IClinicPhone[] = ['phone', 'mobile']

const isMobile = (value: string) => value === 'mobile'
const phoneLink = (value: string) => isMobile(value) ? 'https://wa.me/' : 'tel:'
</script>

<style lang="scss" scoped>
.clinic-item {
  &__mobile {
    display: flex;
    align-content: center;
    column-gap: $space-100;
    img {
      height: rem(17);
      @include mediaSm {
        height: rem(24);
      }
    }
  }
}
</style>
