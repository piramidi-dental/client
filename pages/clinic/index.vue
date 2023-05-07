<script setup lang="ts">
import { ClinicSections } from '@/types/enums'
import type { ListAttributes, List } from '@/types/sectionList'
import type { Doctors, DoctorListAttributes, Doctor } from '@/types/clinic'

definePageMeta({
  title: 'clinic'
})

const { $apiParameters } = useNuxtApp()
const { find } = useStrapi4()

const doctorsData = ref<DoctorListAttributes>()
const benefitData = ref<ListAttributes>()

const transformDoctorItems = (items: Doctor[]) => items.map(item => ({
  ...item,
  attributes: {
    name: item.attributes.name,
    description: item.attributes.roles,
    text: item.attributes.experience
  }
}))

const retriveDoctorData = async () => {
  try {
    const dataName = `${ClinicSections.Doctor}-list`
    const { data: response, error } = await useAsyncData(dataName, () => find<Doctors>(dataName, $apiParameters.population))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    doctorsData.value = (response.value as Doctors).data.attributes as DoctorListAttributes
  } catch (error) {
    showError(error as IRequestError)
  }
}

const retriveBenefitData = async () => {
  try {
    const dataName = ClinicSections.PatientBenefit
    const { data: response, error } = await useAsyncData(dataName, () => find<List>(dataName, $apiParameters.population))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    benefitData.value = (response.value as List).data.attributes as ListAttributes
  } catch (error) {
    showError(error as IRequestError)
  }
}

await Promise.all([retriveDoctorData(), retriveBenefitData()])
</script>

<template lang="pug">
.clinic
  page-cover
    .clinic__container
      p.pages__description {{ doctorsData.description }}
      ul.clinic__cards-list
        li.clinic__card(v-for="doctor in transformDoctorItems(doctorsData.doctors.data)" :key="doctor.attributes.uuid")
          ui-ds-card(:card-data="doctor.attributes")
      .clinic__assistants-list
        section-list(section-name="assistant" is-title-visible is-description-visible)
      .clinic__perks
        h3.pages__subtitle {{ benefitData.title }}
        p.pages__description {{ benefitData.description }}
</template>

<style lang="scss" scoped>
.clinic {
  &__container {
    padding-top: 0;

    @include mediaSm {
      padding-top: $space-200;
    }

    @include mediaMd {
      padding-top: $space-300;
    }
  }

  &__cards-list {
    li + li {
      margin-top: $space-100;

      @include mediaSm {
        margin-top: $space-200;
      }

      @include mediaSm {
        margin-top: $space-300;
      }
    }
  }

  &__assistants-list,
  &__perks {
    :deep(.pages__description),
    :deep(.ds-list) {
      padding-top: $space-100;

      @include mediaSm {
        padding-top: $space-200;
      }
    }
  }
}
</style>
