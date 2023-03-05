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
useWindowWidth()

const locale = useState<string>('locale.setting')
const bodyList = useState<string[]>('body-list')

const bodyClasses = computed(() => bodyList.value?.join(' '))

useHead({
  titleTemplate: `%s - ${app.name}`,
  bodyAttrs: {
    class: bodyClasses
  }
})
</script>
