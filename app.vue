<template>
  <Html :lang="locale">
    <Body>
      <LoadingSpinner />
      <NuxtPage />
    </Body>
  </Html>
</template>

<script setup lang="ts">
import { AppSetup } from '@/utils/app'

const locale = useState<string>('locale.setting')
const app = useState<IApp>('app')
const bodyList = useState<string[]>('body-list')

const bodyClasses = computed(() => bodyList.value?.join(' '))
const createTitle = (title: string) => (title.substring(0, title.indexOf('-')) || title) + ' - '

useHead({
  titleTemplate: (titleChunk: string) : string => {
    return (titleChunk ? createTitle(titleChunk) : '') + app.value?.name
  },
  bodyAttrs: {
    class: bodyClasses
  }
})

AppSetup()
</script>
