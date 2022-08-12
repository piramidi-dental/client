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

const bodyClasses = computed(() => bodyList.value.join(' '))
const createTitle = (title: string) => (title.substring(0, title.indexOf('-')) || title) + ' - '

useHead({
  titleTemplate: (titleChunk: string) : string => {
    return (titleChunk ? createTitle(titleChunk) : '') + app.value.name
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'google', content: 'notranslate' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { hid: 'description', name: 'description', content: '' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  bodyAttrs: {
    class: bodyClasses
  }
})

AppSetup()
</script>
