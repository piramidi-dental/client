
<script setup lang="ts">
import type { ListItem } from '@/types/sectionList'

type accordionItem = (ListItem & { isOpen: boolean })

const props = defineProps({
  componentData: {
    type: Array,
    required: true
  }
})

const accordionData = ref<accordionItem[]>(props.componentData.map(item => ({ ...item as ListItem, isOpen: false })))

const toggleOpenPanel = (id: number) => {
  const selectedItem = accordionData.value.find(el => el.id === id) as accordionItem
  const panel = document.getElementById(`panel-${id}`)
  const description = (document.getElementById(`panel-description-${id}`))

  if (panel) {
    panel.style.maxHeight = selectedItem.isOpen ? '0' : `${(description?.offsetHeight as number) / 16}rem`
  }

  selectedItem.isOpen = !selectedItem.isOpen
}
</script>

<template lang="pug">
.ds-accordion.ds-component
  .ds-accordion__row.ds-component__row(v-for="item in accordionData" :key="item.id")
    h3
      button.ds-accordion__row-btn(
        type="button"
        :id="`btn-${item.id}`"
        :aria-expanded="`${item.isOpen}`"
        :aria-controls="`panel-${item.id}`"
        @click="toggleOpenPanel(item.id)")
        span.ds-component__row-title {{ item.attributes.name }}
    .ds-accordion__row-panel(
      :id="`panel-${item.id}`"
      role="region"
      :aria-labelledby="`btn-${item.id}`")
      p.ds-component__row-description(:id="`panel-description-${item.id}`") {{ item.attributes.description }}
</template>

<style lang="scss" scoped>
.ds-accordion {
  &__row {
    &-btn {
      cursor: pointer;
      background: transparent;
      padding: 0;
      border: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    &-panel {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in;
    }
  }
}
</style>
