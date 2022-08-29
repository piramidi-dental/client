<template lang="pug">
.nav-bar(:class="{ 'nav-bar--visible': navBarMenuVisible }")
  h4.nav-bar__title(ref="navBarTitle") {{ app.name }}
  UiMobileIconMenu
</template>

<script setup lang="ts">
import { AppSetup } from '@/utils/app'

const { app } = AppSetup()
const waveTemplate = useState<boolean>('wave-template')
const waveController = useState<IWaveController>('wave-controller')

const navBarTitle = ref<HTMLElement | null>(null)

const navBarMenuVisible = computed(() => !waveController.value.isLoading && waveTemplate.value)

watch(waveTemplate, (val) => {
  if (val) { (navBarTitle.value as HTMLElement).style.opacity = '1' }
})
</script>

<style lang="scss" scoped>
.nav-bar {
  padding: $space-200;
  background-color: transparent;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  mix-blend-mode: difference;
  z-index: 1;
  &--visible {
    z-index: 3;
  }
  &__title {
    @include txt-title-300;
    color: $color-white;
  }
}
</style>
