<script setup lang="ts">
import type { ListItem, ListAttributes, List, Lists } from '@/types/sectionList'

const props = defineProps({
  sectionName: {
    type: String,
    required: true
  },

  isTitleVisible: {
    type: Boolean,
    default: false
  }
})

const { $apiParameters } = useNuxtApp()
const { find } = useStrapi4()

const dataList = ref<ListAttributes>()

const getSectionData = computed(() => {
  const itemsName = `${props.sectionName}s` as Lists
  return (dataList.value as ListAttributes)[itemsName].data as ListItem[]
})

const getComponentType = computed(() => {
  const type = (dataList.value as ListAttributes).componentType as componentType

  return {
    accordion: resolveComponent('UiDsAccordion'),
    list: '',
    table: resolveComponent('UiDsTable')
  }[type]
})

const findData = async () => {
  try {
    const listName = `${props.sectionName}-list`
    const { data: response, error } = await useAsyncData(listName, () => find<List>(listName, $apiParameters.population))

    if (error.value) {
      throw useRequestError(error.value as IRequestError)
    }

    dataList.value = (response.value as List).data.attributes as ListAttributes
  } catch (error) {
    showError(error as IRequestError)
  }
}

await findData()
</script>

<template lang="pug">
h2.pages__subtitle(v-if="props.isTitleVisible && dataList.title") {{ dataList.title }}
component(:is="getComponentType" :component-data="getSectionData")
</template>
