<template lang="pug">
.loading-spinner
  .loading-spinner__triangle-svg
    svg(viewBox="0 0 86 80")
      polygon(points="43 8 79 72 7 72")
  h1.loading-spinner__text {{ animationText }}
</template>

<script setup lang="ts">
import { AppSetup } from '@/utils/app'

const props = defineProps({
  appIsMounted: {
    type: Boolean,
    required: true
  }
})

const { app } = AppSetup()
const waveController = useState<IWaveController>('wave-controller')

const animationText = computed<string>(() => props.appIsMounted ? waveController.value.loadingText : app.name)

</script>

<style lang="scss" scoped>
@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }
  66% {
    transform: translate(10px, -18px);
  }
  100% {
    transform: translate(-10px, -18px);
  }
}

.loading-spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  &__triangle-svg {
    $duration: 3s;

    width: rem(48);
    height: rem(44);
    position: relative;
    display: inline-block;

    &:before {
      content: '';
      width: rem(6);
      height: rem(6);
      border-radius: 50%;
      position: absolute;
      display: block;
      background: $color-tertiary;
      top: rem(37);
      left: rem(21);
      transform: translate(rem(-10), rem(-18));
      animation: dotTriangle $duration cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      polygon {
        fill: none;
        stroke: $color-primary;
        stroke-width: rem(10);
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dasharray: 145 (221 - 145) 145 (221 - 145);
        stroke-dashoffset: 0;
        animation: pathTriangle $duration cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
      }
    }
  }

  &__text {
    color: $color-white;
    @include txt-body-600;
    margin-top: $space-200;
  }
}
</style>
