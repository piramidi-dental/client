<script setup lang="ts">
import { DsLinkType, DsLinkSize, ClinicsItemMode } from '@/types/enums'

const props = defineProps({
  clinicAttr: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: ClinicsItemMode.Footer
  }
})

const isCardMode = computed(() => props.mode === ClinicsItemMode.Card)
const phoneType = computed(() => ({
  card: DsLinkType.Secondary,
  footer: DsLinkType.Negative
}[props.mode]))
const linkType = computed(() => ({
  card: DsLinkType.Primary,
  footer: DsLinkType.Tertiary
}[props.mode]))
</script>

<template lang="pug">
.clinic-item
  h4(:class="{ 'ds-card__title': isCardMode }") {{ clinicAttr.name }}
  p(
    :class="['clinic-item__address', { 'ds-card__description': isCardMode }]"
    v-html="clinicAttr.address")
  clinic-phones-list(
    :clinic-attr="clinicAttr"
    :type="phoneType")
  ui-ds-link(
    :to="clinicAttr.map"
    :name="$t('contacts.viewMap')"
    :type="linkType"
    :size="DsLinkSize.Small"
    target="_blank"
    arrow-icon)
</template>

<style lang="scss" scoped>
.clinic-item {
  &__address {
    @include text-space-wrap;
  }
}
</style>
