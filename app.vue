<template>
  <Html :lang="locale">
    <Body>
      <WaveTemplate />
      <NavBar />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup lang="ts">
import { AppSetup } from '@/utils/app'

const { app } = AppSetup()
const locale = useState<string>('locale.setting')
const bodyList = useState<string[]>('body-list')

const bodyClasses = computed(() => bodyList.value?.join(' '))
const createTitle = (title: string) => (title.substring(0, title.indexOf('-')) || title) + ' - '

useHead({
  titleTemplate: (titleChunk: string) : string => (titleChunk ? createTitle(titleChunk) : '') + app.name,
  bodyAttrs: {
    class: bodyClasses
  }
})

</script>
