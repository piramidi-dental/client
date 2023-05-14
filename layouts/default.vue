<script setup lang="ts">
import { Pages } from '@/types/enums'

const route = useRoute()
const isClinicPage = computed(() => route.meta.title !== Pages.Contacts)
</script>

<template lang="pug">
slot
footer-info(v-if="isClinicPage")
</template>
