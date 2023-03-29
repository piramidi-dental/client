<script setup lang="ts">
const { t } = useLang()

useHead({
  title: t('pages.contacts')
})

definePageMeta({
  title: 'contacts'
})
</script>

<template lang="pug">
.contacts
  h1 contacts
</template>
