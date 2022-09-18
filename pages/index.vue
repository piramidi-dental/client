<template lang="pug">
.home-page
  .home-page__dental-tool(ref="dentalTool")
    img(src="/images/dental-tool.svg" alt="dental-tool")
  section.home-page__main
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
              :size="getPhoneListSize"
              has-icon
              type="neutral")
  section.home-page__cover-box
    img(:src="getCoverImage.url" :alt="getCoverImage.alt")
  section.home-page__terapies
    p Cosa facciamo
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
const { isResponsiveSm } = useMediaResponsive()
const { $composeImageUri } = useNuxtApp()

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
const scrollEffects = ref<(HTMLElement | void)[]>([])
const clinicsListAttr = ref()

const getCoverImage = computed<IStringItem>(() => {
  const _coverPage = (coverPage as IStringNumberNullItem)
  return {
    url: $composeImageUri(_coverPage.url as string),
    alt: (_coverPage.alternativeText as string)
  }
})
const getPhoneListSize = computed(() => isResponsiveSm.value ? 'small' : 'normal')

const scrollAnimationsHandler = () : void => {
  resetAnimation()

  nextTick(() => {
    const _headerSize = NAV_HEADER[isResponsiveSm.value ? 'NORMAL' : 'MOBILE']

    const _dentalToolHeight:number = (dentalTool.value as HTMLElement).offsetHeight
    const _dentalToolTop:number = _headerSize - DEFAULT_VALUES.PADDING_200
    const _windowHeight:number = window.innerHeight
    const _toValue:number = (_dentalToolHeight - _windowHeight) + _dentalToolTop

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
      offset: _windowHeight - _headerSize,
      duration: _headerSize
    })

    scrollEffects.value = [
      parallax(plxOption),
      stylesEffect(stlOption)
    ]
  })
}

const resetAnimation = () => {
  for (const effect of scrollEffects.value) { if (effect) { effect.remove() } }
}

watch(windowWidth, () => {
  if (pageIsMounted.value && !waveTemplate.value) { scrollAnimationsHandler() }
})
watch(waveTemplate, (val) => {
  if (!val) { scrollAnimationsHandler() }
})

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

  $--mobile-main-height: calc(#{$-viewport-height} + #{$-mobile-header-height});
  $--mobile-main-right-padding: calc(#{$-mobile-header-height} + #{$space-200});
  $--mobile-main-bottom-padding: calc(#{$-mobile-header-height} + #{$space-500});

  $--tablet-main-height: calc(((#{$-viewport-height} / 3) * 2) + #{$-header-height});
  $--tablet-main-left-padding: calc(#{$space-1000} + #{$space-400});
  $--tablet-cover-img-height: #{$-viewport-height} / 3;

  &__dental-tool {
    position: absolute;
    height: calc(#{$-viewport-height} + 30%);
    left: $space-200;
    z-index: 1;
    img {
      height: 100%;
      filter: drop-shadow($shadow-300);
    }
    @include mediaSm {
      left: $space-400;
    }
  }
  &__main {
    height: $--mobile-main-height;
    background-color: $color-secondary-hard-dark;
    padding: $--mobile-main-right-padding $space-200 $--mobile-main-bottom-padding $space-900;
    display: flex;
    place-items: center;
    @include mediaSm {
      height: $--tablet-main-height;
      padding: $-header-height $space-400 $space-400 $--tablet-main-left-padding;
    }
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
      @include mediaSm {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      > li {
        display: flex;
        column-gap: $space-200;
        .ds-icon-location {
          color: $color-tertiary;
          font-size: $icon-size-400;
          margin-top: $space-100;
        }
      }
      > li + li {
        margin-top: $space-200;
        @include mediaSm {
          margin: 0 0 0 $space-200;
        }
      }
      &-info {
        display: grid;
        row-gap: $space-100;
        align-content: start;
        h3 {
          @include txt-title-300;
          color: $color-white;
        }
        ::v-deep(ul) {
          li + li {
            margin-top: $space-100;
          }
        }
      }
    }
  }
  &__cover-box {
    width: 100%;
    height: rem(280);
    padding: $space-200;
    background-color: $color-white;
    @include mediaSm {
      padding: $space-200 0 $space-200 $space-1000;
      height: $--tablet-cover-img-height;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transform: scaleX(-1);
      filter: drop-shadow($shadow-200);
    }
  }
  &__terapies {
    background-color: $color-white;
    padding: $space-400 $space-200 $space-500;
    height: 1500px;
  }
}
</style>
