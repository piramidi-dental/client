<template lang="pug">
ul.menu-icon(
  :class="getIconModifiers"
  @click="toggleMenu")
  li
  li
  li
</template>

<script setup lang="ts">
import { LOADING } from '@/constants'

const { handleWaveActivation } = useWaveController()
const { isResponsiveMd } = useWindowWidth()

const waveController = useState<IWaveController>('wave-controller')
const mobileMenu = ref<boolean>(false)
const isDisable = ref<boolean>(false)
// const emit = defineEmits<{(e: 'open-mobile-menu', mobileMenu: boolean): void}>()

const getIconModifiers = computed(() => [{ 'menu-icon--open': mobileMenu.value, 'menu-icon--is-disabled': isDisable.value }])

const toggleMenu = () : void => {
  mobileMenu.value = !mobileMenu.value
  isDisable.value = true
  handleWaveActivation({ value: mobileMenu.value, isLoading: false })

  setTimeout(() => {
    isDisable.value = false
  }, LOADING.WAVE_DURATION)
  // emit('open-mobile-menu', mobileMenu.value)
}

watch(isResponsiveMd, (val) => {
  if (val && waveController.value.isActive && !waveController.value.isLoading) {
    toggleMenu()
  }
})
</script>

<style lang="scss" scoped>
.menu-icon {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: $space-400;
  height: $space-400;
  &--is-disabled {
    pointer-events: none;
  }
  li {
    width: $space-400;
    height: $space-050;
    background: $color-white;
    transition: all 0.5s linear;
    transform-origin: 1px;
  }
  li:nth-child(odd) {
    transform: rotate(0);
  }
  li:nth-child(even) {
    opacity: 1;
    transform: translateX(0);
  }
  &--open {
    li:first-child {
      transform: rotate(45deg);
    }
    li:nth-child(2) {
      opacity: 0;
    }
    li:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
}
</style>
