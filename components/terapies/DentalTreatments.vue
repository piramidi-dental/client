
<script setup lang="ts">
import type { ITreatmentList, ITreatmentAttr, ITreatments } from '@/types/terapies'

const { $apiParameters } = useNuxtApp()
const { find } = useStrapi4()
const route = useRoute()

const treatmentList = ref<ITreatmentAttr>()

const getTreatmentTitle = computed<string>(() =>
  route.meta.title === 'Home'
    ? ''
    : (treatmentList.value as ITreatmentAttr).title ?? ''
)

const getTreatmentInfo = computed(() => {
  const list = treatmentList.value as ITreatmentAttr
  return {
    data: list.treatments.data as ITreatments[],
    type: list.componentType as componentType
  }
})

const retriveTreatmentsList = async () => {
  try {
    const { data: treatments, error } = await useAsyncData('treatment-list', () => find<ITreatmentList>('treatment-list', $apiParameters.population))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    treatmentList.value = (treatments.value as ITreatmentList).data.attributes as ITreatmentAttr
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
