<template lang="pug">
#home-page
  .tool-plx(ref="toolPlx")
    img(src="/images/dental-tool.svg" alt="dental-tool")
  section.home(ref="homeSection")
  section.terapies
</template>

<script setup lang="ts">
import { DEFAULT_VALUES } from '@/constants'

const toolPlx = ref<HTMLElement | null>(null)
const homeSection = ref<HTMLElement | null>(null)
const windowWidth = useWindowWidth()
const { parallax } = useScrollmagic()

const toolAnimationHandler = () : void => {
  if (toolPlx.value && homeSection.value) {
    const toolHeight:number = toolPlx.value.offsetHeight
    const homeHeight:number = homeSection.value.offsetHeight
    const toValue:number = (toolHeight - homeHeight) + DEFAULT_VALUES.PADOING_400

    const plxOption = ({
      dataTween: {
        fn: 'fromTo',
        el: '.tool-plx',
        from: { y: DEFAULT_VALUES.PADOING_400, duration: 1, ease: 'linear' },
        to: { y: -toValue, duration: 1, ease: 'linear' }
      }
    })

    parallax(plxOption)
  }
}

watch(windowWidth, toolAnimationHandler)
</script>

<style lang="scss" scoped>
.tool-plx {
  position: absolute;
  height: 130vmax;
  left: $space-200;
  img {
    height: 100%;
    filter: drop-shadow($shadow-200);
  }
}
.home {
  height: 100vmax;
  background-color: $color-secondary;
}
.terapies {
  height: 100vmax;
}
</style>
