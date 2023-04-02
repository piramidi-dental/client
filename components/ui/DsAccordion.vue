
<script setup lang="ts">
import type { ListItem } from '@/types/sectionList'

type accordionItem = (ListItem & { isOpen: boolean })

const props = defineProps({
  componentData: {
    type: Array,
    required: true
  }
})

const accordionData: accordionItem[] = props.componentData.map(item => ({ ...item as ListItem, isOpen: false }))

const toggleOpenPanel = (uuid: string) => {
  const selectedItem = accordionData.find(el => el.attributes.uuid === uuid) as accordionItem
  const panel = document.getElementById(`panel-${uuid}`)
  const description = document.getElementById(`panel-description-${uuid}`)

  if (panel) {
    panel.style.maxHeight = selectedItem.isOpen ? '0' : `${(description?.offsetHeight as number) / 16}rem`
  }

  selectedItem.isOpen = !selectedItem.isOpen
}
</script>

<template lang="pug">
.ds-accordion.ds-component
  .ds-accordion__row.ds-component__row(v-for="item in accordionData" :key="item.uuid")
    h3
      button.ds-accordion__row-btn(
        type="button"
        :id="`btn-${item.attributes.uuid}`"
        :aria-expanded="`${item.isOpen}`"
        :aria-controls="`panel-${item.attributes.uuid}`"
        @click="toggleOpenPanel(item.attributes.uuid)")
        span.ds-component__row-title {{ item.attributes.name }}
    .ds-accordion__row-panel(
      :id="`panel-${item.attributes.uuid}`"
      role="region"
      :aria-labelledby="`btn-${item.attributes.uuid}`")
      p.ds-component__row-description(:id="`panel-description-${item.attributes.uuid}`") {{ item.attributes.description }}
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
