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
  },

  isDescriptionVisible: {
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
    accordion: resolveComponent('ui-ds-accordion'),
    list: resolveComponent('ui-ds-list'),
    table: resolveComponent('ui-ds-table')
  }[type]
})

const retriveData = async () => {
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

await retriveData()
</script>

<template lang="pug">
h3.pages__subtitle(v-if="props.isTitleVisible && dataList.title") {{ dataList.title }}
p.pages__description(v-if="props.isDescriptionVisible && dataList.description") {{ dataList.description }}
component(:is="getComponentType" :component-data="getSectionData")
</template>
