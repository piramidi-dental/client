
<script setup lang="ts">
import type { TreatmentList, TreatmentAttr, Treatments } from '@/types/terapies'

const { $apiParameters } = useNuxtApp()
const { find } = useStrapi4()
const route = useRoute()

const treatmentList = ref<TreatmentAttr>()

const getTreatmentTitle = computed<string>(() =>
  route.meta.title === 'Home'
    ? ''
    : (treatmentList.value as TreatmentAttr).title ?? ''
)

const getTreatmentInfo = computed(() => {
  const list = treatmentList.value as TreatmentAttr
  return {
    data: list.treatments.data as Treatments[],
    type: list.componentType as componentType
  }
})

const retriveTreatmentsList = async () => {
  try {
    const { data: treatments, error } = await useAsyncData('treatment-list', () => find<TreatmentList>('treatment-list', $apiParameters.population))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    treatmentList.value = (treatments.value as TreatmentList).data.attributes as TreatmentAttr
  } catch (error) {
    showError(error as IRequestError)
  }
}

await retriveTreatmentsList()
</script>

<template lang="pug">
h2.pages__subtitle {{ getTreatmentTitle }}
SharedDynamicComponent(:component-data="getTreatmentInfo.data" :component-type="getTreatmentInfo.type")
</template>
