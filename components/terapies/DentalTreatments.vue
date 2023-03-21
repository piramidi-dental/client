
<script setup lang="ts">
import type { ITreatmentList, ITreatmentAttr, ITreatments } from '@/types/terapies'

const { $apiParameters } = useNuxtApp()
const { find } = useStrapi4()
const route = useRoute()

const treatmentList = ref<ITreatmentAttr>()

const getTreatmentTitle = computed<string>(() =>
  route.meta.title === 'Home'
    ? 'Cosa facciamo'
    : (treatmentList.value as ITreatmentAttr)?.title ?? ''
)
const getTreatmentComponent = computed(() => {
  const componentType: componentType = (treatmentList.value as ITreatmentAttr).componentType
  const components = {
    accordeon: '',
    list: '',
    table: resolveComponent('UiDsTable')
  }

  return components[componentType]
})
const getTreatmentList = computed<ITreatments[]>(() => (treatmentList.value as ITreatmentAttr)?.treatments?.data ?? [])

const retriveTreatmentsList = async () => {
  try {
    const { data: treatments, error } = await useAsyncData('treatment-list', () => find<ITreatmentList>('treatment-list', $apiParameters.population))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    treatmentList.value = (treatments.value as ITreatmentList).data.attributes
  } catch (error) {
    showError(error as IRequestError)
  }
}

retriveTreatmentsList()
</script>

<template lang="pug">
h2.pages__subtitle {{ getTreatmentTitle }}
client-only
  component(v-if="treatmentList" :is="getTreatmentComponent" :table-data="getTreatmentList")
</template>
