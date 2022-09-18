<template lang="pug">
.home-page
  .home-page__dental-tool(ref="dentalTool")
    img(src="/images/dental-tool.svg" alt="dental-tool")
  section.home-page__main(ref="mainSection")
    .home-page__info-box
      .home-page__image-box
        img(src="/images/client_logo.svg" alt="client logo")
      ul.home-page__clinic-list
        li(v-for="clinic in clinicsListAttr" :key="clinic.id")
          span.ds-icon-location
          .home-page__clinic-list-info
            h3 {{ clinic.name }}
            ClinicPhonesList(
              :clinic-attr="clinic"
              size="normal"
              has-icon
              type="neutral")
  section.home-page__terapies
    div(style="background-color: red; width: 100%; height: 200px;")
    button(@click="navigateToTerapies") Terapies

</template>

<script setup lang="ts">
import type { IClinic } from '@/types/contacts'
import {
  DEFAULT_VALUES,
  LOADING,
  NAV_HEADER
} from '@/constants'

const { t } = useLang()
const { parallax, stylesEffect } = useScrollmagic()
const coverPage = await useCoverPage('home')

useHead({
  title: t('pages.home')
})

definePageMeta({
  title: 'Home',
  loadingText: 'home',
  pageTransition: {
    mode: 'default',
    duration: LOADING.ANIMATION_DELAY
  },
  middleware: ['loading-text']
})

const waveTemplate = useState<boolean>('wave-template')
const clinicsList = useState<IClinic[]>('clinics-list')
const windowWidth = useState<number>('window-width')

const pageIsMounted = ref<boolean>(false)
const dentalTool = ref<HTMLElement | null>(null)
const mainSection = ref<HTMLElement | null>(null)
const scrollEffects = ref<(HTMLElement | void)[]>([])
const clinicsListAttr = ref()

const scrollAnimationsHandler = () : void => {
  resetAnimation()

  nextTick(() => {
    if (dentalTool.value && mainSection.value) {
      const _dentalToolHeight:number = dentalTool.value.offsetHeight
      const _dentalToolTop:number = DEFAULT_VALUES.PADDING_200 + DEFAULT_VALUES.PADDING_400
      const _mainHeight:number = mainSection.value.offsetHeight - NAV_HEADER.MOBILE
      const _toValue:number = (_dentalToolHeight - _mainHeight) + _dentalToolTop

      const plxOption = ({
        dataTween: {
          fn: 'fromTo',
          el: '.home-page__dental-tool',
          from: { y: _dentalToolTop, duration: 1, ease: 'linear' },
          to: { y: -_toValue, duration: 1, ease: 'linear' }
        }
      })

      const stlOption = ({
        dataTween: {
          fn: 'fromTo',
          el: '.nav-bar__logo-box',
          from: { opacity: 0, ease: 'linear' },
          to: { opacity: 1, ease: 'linear' }
        },
        offset: _mainHeight - NAV_HEADER.MOBILE,
        duration: NAV_HEADER.MOBILE
      })

      scrollEffects.value = [
        parallax(plxOption),
        stylesEffect(stlOption)
      ]
    }
  })
}

const resetAnimation = () => {
  for (const effect of scrollEffects.value) { if (effect) { effect.remove() } }
}

const navigateToTerapies = () => {
  navigateTo({ path: '/terapies' })
}

watch(windowWidth, () => {
  if (pageIsMounted.value && !waveTemplate.value) { scrollAnimationsHandler() }
})
watch(waveTemplate, (val) => {
  if (!val) { scrollAnimationsHandler() }
})

console.log(coverPage)

onMounted(() => {
  pageIsMounted.value = true
  clinicsListAttr.value = [...clinicsList.value].map(clinic => clinic.attributes)
  scrollAnimationsHandler()
})
onUnmounted(resetAnimation)

</script>

<style lang="scss" scoped>
.home-page {
  $self: &;

  &__dental-tool {
    position: absolute;
    height: calc(#{$-viewport-height} + 30%);
    left: $space-200;
    img {
      height: 100%;
      filter: drop-shadow($shadow-300);
    }
    @include mediaSm {
      left: $space-400;
    }
  }
  &__main {
    height: calc(#{$-viewport-height} + #{$-mobile-header-height});
    background-color: $color-secondary-hard-dark;
    padding: calc(#{$-mobile-header-height} + #{$space-200}) $space-200 calc(#{$-mobile-header-height} + #{$space-500}) $space-900;
    display: flex;
    place-items: center;
    #{$self}__info-box {
      max-height: 100%;
      width: 100%;
      display: grid;
      grid-template-rows: 1fr auto;
      row-gap: $space-400;
    }
    #{$self}__image-box {
      text-align: center;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    #{$self}__clinic-list {
      li {
        display: flex;
        column-gap: $space-200;
        .ds-icon-location {
          color: $color-tertiary;
          font-size: $icon-size-400;
          margin-top: $space-100;
        }
      }
      li + li {
        margin-top: $space-200;
      }
      &-info {
        display: grid;
        row-gap: $space-100;
        h3 {
          @include txt-title-300;
          color: $color-white;
        }
        ::v-deep(ul) li + li {
          margin-top: $space-100;
        }
      }
    }
  }
  &__terapies {
    height: rem(1380);
    background-color: $color-white;
  }
}
</style>
