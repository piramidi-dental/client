<template lang="pug">
.loading-spinner(:class="{ 'loading-spinner--before-mount': !appIsMounted }")
  .loading-spinner__triangle-svg
    svg(viewBox="0 0 86 80")
      polygon(points="43 8 79 72 7 72")
  h1.loading-spinner__text {{ animationText }}
</template>

<script setup lang="ts">
const loadingProps = defineProps({
  appIsMounted: {
    type: Boolean,
    required: true
  }
  // triggerCounter: {
  //   type: String,
  //   required: true
  // }
})

// const { $gsap } = useNuxtApp()
const loadingView = useState<ILoading>('loading-view')
const app = useState<IApp>('app')

const { appIsMounted } = toRefs(loadingProps)
// const { appIsMounted, triggerCounter } = toRefs(loadingProps)

const animationText = computed<string>(() => appIsMounted.value ? loadingView.value.text : app.value.name)

// const handleAnimation = () => {
//   const _opacityValue = !appIsMounted.value || triggerCounter.value === 'reverse' ? 0 : 1
//   const _delayValue = appIsMounted.value && triggerCounter.value === 'play' ? 0.3 : 0.7

//   $gsap.to('.loading-spinner', { opacity: _opacityValue, ease: 'easeOut', duration: 0.5, delay: _delayValue })
// }

// watch(triggerCounter, (val) => {
//   if (val) { handleAnimation() }
// })
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
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  &--before-mount {
    opacity: 1;
  }
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
