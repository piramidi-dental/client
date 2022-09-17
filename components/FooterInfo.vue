<template lang="pug">
.footer-info
  .footer-info__inner
    h2.footer-info__title {{ $t('footer.talk') }}
    UiDsLink(
      :to="`mailto:${getContactEmail}`"
      :name="getContactEmail"
      size="small"
      target="_blank")
    ul.footer-info__clinics
      li(
        v-for="clinic in clinicsList"
        :key="`${clinic.id}_${clinic.attributes.name}`")
        ClinicItem(:clinic-attr="clinic.attributes")
    .footer-info__opening-hours(v-html="getOpeningHours")
    UiDsLink.footer-info__contacts-link(
      to="/contacts"
      arrow-icon
      type="tertiary"
      :name="$t('contacts.toContact')")
</template>

<script setup lang="ts">
import type { IClinic, IContactAttr, IContact } from '@/types/contacts'

const { $apiParameters } = useNuxtApp()

const clinicsList = useState<IClinic[]>('clinics-list', () => [])
const contactInfo = ref<IContactAttr>()

const getContactEmail = computed(() => (contactInfo.value as IContactAttr).email)
const getOpeningHours = computed(() => (contactInfo.value as IContactAttr).openingHours)

const retriveClinicsData = async () => {
  try {
    const { data: contact, error } = await useCustomFetch(`/api/contact?${$apiParameters.population}`, { key: 'contact' })

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
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
  @include viewport-height;
  padding: $space-200;
  background-color: $color-secondary-hard-dark;
  display: flex;
  place-items: center;
  @include mediaSm {
    padding: $space-400;
  }
  &__inner {
    width: 100%;
    display: grid;
    align-content: start;
    row-gap: $space-300;
    @include mediaSm {
      row-gap: $space-400;
    }
    @include mediaMd {
      margin: 0 auto;
      max-width: $breakpoint-500;
      grid-template-columns: 1fr auto;
      grid-template-rows: repeat(3, auto) 1fr;
      row-gap: $space-200;
      > *:not(&__clinics) {
        grid-column: 2;
      }
    }
  }
  &__title {
    @include txt-title-500;
    color: $color-white;
  }
  &__clinics {
    @include mediaMd {
      grid-column: 1;
      grid-row: 1 / span 4;
    }

    li {
      @include txt-body-600;
      color: $color-white;
      @include mediaSm {
        @include txt-title-300;
      }
    }

    li + li {
      margin-top: $space-300;
      @include mediaSm {
        margin-top: $space-400;
      }
    }
  }
  &__opening-hours{
    color: $color-neutral;
    @include txt-body-500;
    @include mediaSm {
      @include txt-body-600;
    }
  }
  &__contacts-link {
    @include mediaMd {
      align-self: end;
    }
  }
}
</style>
