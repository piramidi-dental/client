<template lang="pug">
.footer-info
  .footer-info__inner
    h2.footer-info__title {{ $t('footer.talk') }}
    UiDsLink(
      :to="`mailto:${getContactEmail}`"
      :name="getContactEmail"
      size="small"
      target="_blank")
    .footer-info__clinic(
      v-for="clinic in clinicsList"
      :key="`${clinic.id}_${clinic.attributes.name}`")
      p {{ clinic.attributes.name }}
      div(v-html="clinic.attributes.address")
      ul
        li(v-for="item in phonesList" :key="item")
          UiDsLink(
            v-if="clinic.attributes[item]"
            :to="`tel:${clinic.attributes[item]}`"
            size="small"
            :name="$phoneFormatter[item](clinic.attributes[item])")
      UiDsLink(
        :to="clinic.attributes.map"
        :name="$t('contacts.viewMap')"
        type="tertiary"
        size="small"
        target="_blank"
        arrow-icon)
    .footer-info__opening-hours(v-html="getOpeningHours")
    UiDsLink(
      to="/contacts"
      arrow-icon
      type="tertiary"
      :name="$t('contacts.toContact')")
</template>

<script setup lang="ts">
import type { IClinic, IContactAttr, IContact, IClinicPhone } from '@/types/contacts'

const { $apiPopulation, $phoneFormatter } = useNuxtApp()
const clinicsList = useState<IClinic[]>('clinics-list', () => [])
const contactInfo = ref<IContactAttr>()
const phonesList:IClinicPhone[] = ['phone', 'mobile']

const getContactEmail = computed(() => (contactInfo.value as IContactAttr).email)
const getOpeningHours = computed(() => (contactInfo.value as IContactAttr).openingHours)

const retriveClinicsData = async () => {
  try {
    const { data: contact, error } = await useCustomFetch(`/api/contact?${$apiPopulation.query}`, { key: 'contact' })

    if (error.value) {
      throw createError({})
    }

    contactInfo.value = (contact.value as IContact).data.attributes
    clinicsList.value = contactInfo.value.clinics.data
    clinicsList.value = clinicsList.value.map(clinic => (
      {
        ...clinic,
        attributes: {
          ...clinic.attributes,
          phone: `0${clinic.attributes.phone}`
        }
      }
    ))
  } catch (error) {
    throwError(error as Error)
  }
}

await retriveClinicsData()
</script>

<style lang="scss" scoped>
.footer-info {
  min-height: 100vmax;
  padding: $space-200;
  background-color: $color-secondary-hard-dark;
  display: flex;
  place-items: center;
  @include mediaMd {
    min-height: 100vmin;
  }
  &__inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: $space-300;
  }
  &__title {
    @include txt-title-500;
    color: $color-white;
  }
  &__email {
    color: $color-white;
    @include txt-body-600;
  }
  &__clinic {
    @include txt-body-600;
    color: $color-white;
  }
  &__opening-hours{
    color: $color-neutral;
    @include txt-body-500
  }
}
</style>
