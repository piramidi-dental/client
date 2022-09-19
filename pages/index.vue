<template lang="pug">
//- .home-page
//-   client-only
//-     .home-page__dental-tool(ref="dentalTool" v-if="!isResponsiveMd")
//-       img(src="/images/dental-tool.svg" alt="dental-tool")
//-   section.home-page__main
//-     client-only
//-       template(v-if="!isResponsiveMd")
//-         .home-page__info-box
//-           .home-page__image-box
//-             img(src="/images/client_logo.svg" alt="client logo")
//-           ul.home-page__clinic-list
//-             li(v-for="clinic in clinicsListAttr" :key="clinic.id")
//-               span.ds-icon-location
//-               .home-page__clinic-list-info
//-                 h3 {{ clinic.name }}
//-                 ClinicPhonesList(
//-                   :clinic-attr="clinic"
//-                   :size="getPhoneListSize"
//-                   has-icon
//-                   type="neutral")
//-       template(v-else)
//-         .home-page__md-main-inner
//-           .home-page__md-logo-box
//-           ul.home-page__clinic-list
//-             li(v-for="clinic in clinicsListAttr" :key="clinic.id")
//-               span.ds-icon-location
//-               .home-page__clinic-list-info
//-                 h3 {{ clinic.name }}
//-                 ClinicPhonesList(
//-                   :clinic-attr="clinic"
//-                   :size="getPhoneListSize"
//-                   has-icon
//-                   type="neutral")
//-   client-only
//-     section.home-page__cover-box(v-if="!isResponsiveMd")
//-       img(:src="getCoverImage.url" :alt="getCoverImage.alt")
//-   section.home-page__terapies
//-     p Cosa facciamo
.home-page
  client-only
    section.home-page__cover
      .home-page__dental-tool(ref="dentalTool" v-if="!isResponsiveMd")
        img(src="/images/dental-tool.svg" alt="dental-tool")
      .home-page__cover-info
        .home-page__client-logo
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
      .home-page__cover-image(v-if="!isResponsiveMd")
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
const { isResponsiveSm, isResponsiveMd } = useMediaResponsive()
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
    const _windowHeight:number = window.innerHeight

    if (!isResponsiveMd.value) {
      const _dentalToolHeight:number = (dentalTool.value as HTMLElement).offsetHeight
      const _dentalToolTop:number = _headerSize - DEFAULT_VALUES.PADDING_200
      const _toValue:number = (_dentalToolHeight - _windowHeight) + _dentalToolTop

      const plxOption = ({
        dataTween: {
          fn: 'fromTo',
          el: '.home-page__dental-tool',
          from: { y: _dentalToolTop, duration: 1, ease: 'linear' },
          to: { y: -_toValue, duration: 1, ease: 'linear' }
        }
      })

      scrollEffects.value.push(parallax(plxOption))
    }

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

    scrollEffects.value.push(stylesEffect(stlOption))
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
@import '@/assets/scss/ui/home-page-var';

.home-page {
  $self: &;

  &__cover {
    position: relative;
    background-color: $color-secondary-hard-dark;
    height: $--mobile-cover-height;

    @include mediaSm {
      height: $--tablet-cover-height;
    }

    #{$self}__dental-tool {
      top: 0;
      position: absolute;
      height: $--dental-tool-height;
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

    &-info {
      padding: $--mobile-cover-right-padding $space-200 $--mobile-cover-bottom-padding $space-900;
      height: $--mobile-cover-info-height;
      width: 100%;
      display: grid;
      align-content: center;
      row-gap: $space-400;
      @include mediaSm {
        height: $--tablet-cover-info-height;
        padding: $-header-height $space-400 $space-400 $--tablet-cover-left-padding;
      }
    }

    #{$self}__client-logo {
      text-align: center;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    &-image {
      width: 100%;
      height: $--mobile-cover-image-height;
      padding: $space-200;
      background-color: $color-white;
      @include mediaSm {
        height: $--tablet-cover-image-height;
        padding: $space-200 0 $space-200 $space-1000;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: right top;
        transform: scaleX(-1);
        border-radius: $radius-200;
      }
    }

    #{$self}__clinic-list {
      display: grid;
      justify-content: center;
      @include mediaSm {
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
        @include mediaMd {
          margin-left: $space-300;
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

  &__terapies {
    background-color: $color-white;
    padding: $space-400 $space-200 $space-500;
    height: 1500px;
  }
  // &__main {
  //   height: $--mobile-main-height;
  //   background-color: $color-secondary-hard-dark;
  //   padding: $--mobile-main-right-padding $space-200 $--mobile-main-bottom-padding $space-900;
  //   display: flex;
  //   place-items: center;
  //   @include mediaSm {
  //     height: $--tablet-main-height;
  //     padding: $-header-height $space-400 $space-400 $--tablet-main-left-padding;
  //   }
  //   @include mediaMd {
  //     @include viewport-height;
  //     padding: $--desktop-main-top-padding $space-400 $space-400;
  //     justify-content: center;
  //   }
  //   #{$self}__info-box {
  //     max-height: 100%;
  //     width: 100%;
  //     display: grid;
  //     grid-template-rows: 1fr auto;
  //     row-gap: $space-400;
  //   }
  //   #{$self}__image-box {
  //     text-align: center;
  //     overflow: hidden;
  //     img {
  //       height: 100%;
  //     }
  //   }
  //   #{$self}__md-main-inner {
  //     width: 100%;
  //     max-width: $breakpoint-500;
  //     height: 100%;
  //     display: grid;
  //     grid-template-rows: 1fr auto;
  //     row-gap: $space-400;
  //   }
  //   #{$self}__md-logo-box {
  //     background-color: $color-white;
  //     width: 100%;
  //     border-radius: $radius-200;
  //   }
  //   #{$self}__clinic-list {
  //     display: grid;
  //     justify-content: center;
  //     @include mediaSm {
  //       grid-template-columns: repeat(2, 1fr);
  //     }
  //     > li {
  //       display: flex;
  //       column-gap: $space-200;
  //       .ds-icon-location {
  //         color: $color-tertiary;
  //         font-size: $icon-size-400;
  //         margin-top: $space-100;
  //       }
  //     }
  //     > li + li {
  //       margin-top: $space-200;
  //       @include mediaSm {
  //         margin: 0 0 0 $space-200;
  //       }
  //       @include mediaMd {
  //         margin-left: $space-300;
  //       }
  //     }
  //     &-info {
  //       display: grid;
  //       row-gap: $space-100;
  //       align-content: start;
  //       h3 {
  //         @include txt-title-300;
  //         color: $color-white;
  //       }
  //       ::v-deep(ul) {
  //         li + li {
  //           margin-top: $space-100;
  //         }
  //       }
  //     }
  //   }
  // }
  // &__cover-box {
  //   width: 100%;
  //   height: rem(280);
  //   padding: $space-200;
  //   background-color: $color-white;
  //   @include mediaSm {
  //     padding: $space-200 0 $space-200 $space-1000;
  //     height: $--tablet-cover-img-height;
  //   }
  //   img {
  //     height: 100%;
  //     width: 100%;
  //     object-fit: cover;
  //     transform: scaleX(-1);
  //     border-radius: $radius-200;
  //   }
  // }
  // &__terapies {
  //   background-color: $color-white;
  //   padding: $space-400 $space-200 $space-500;
  //   height: 1500px;
  // }
}
</style>
