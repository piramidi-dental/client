<template lang="pug">
.home-page
  client-only
    section.home-page__cover
      .home-page__dental-tool(ref="dentalTool" v-if="!isResponsiveMd")
        img(src="/images/dental-tool.svg" alt="dental-tool")
      .home-page__cover-info
        .home-page__client-box
          .home-page__client-box-inner
            .home-page__cover-image(v-if="isResponsiveMd")
              img(:src="getCoverImage.url" :alt="getCoverImage.alt")
            .home-page__client-box-logo
              img(src="/images/client_logo.svg" alt="client logo")
        ul.home-page__clinic-list
          li(v-for="clinic in clinicsListAttr" :key="clinic.id")
            span.ds-icon-location
            .home-page__clinic-list-info
              h3 {{ `${t('home.clinic')} ${clinic.name}` }}
              clinic-phones-list(
                :clinic-attr="clinic"
                :size="getPhoneListSize"
                has-icon
                type="neutral")
      .home-page__cover-image(v-if="!isResponsiveMd")
        img(:src="getCoverImage.url" :alt="getCoverImage.alt")
  section.home-page__therapies
    .home-page__therapies-inner
      h2.pages__title.home-page__therapies-title {{ t('home.whatWeDo') }}
      section-list(section-name="treatment")
      .home-page__therapies-link
        ui-ds-link(
          :name="`${t('links.goTo')} ${t('pages.therapies')}`"
          to="/therapies"
          arrow-icon
          :type="DsLinkType.Secondary")
</template>

<script setup lang="ts">
import type { Clinic } from '@/types/contacts'
import {
  DefaultValues,
  NavHeader,
  DsLinkType
} from '@/types/enums'

const { t } = useLang()
const { parallax, stylesEffect } = useScrollmagic()
const coverPage = await useCoverPage('home')
const { isResponsiveSm, isResponsiveMd } = useMediaResponsive()
const { $composeImageUri } = useNuxtApp()

useHead({
  title: t('pages.home')
})

definePageMeta({
  title: 'home'
})

const waveTemplate = useState<boolean>('wave-template')
const clinicsList = useState<Clinic[]>('clinics-list')
const windowWidth = useState<number>('window-width')

const pageIsMounted = ref<boolean>(false)
const dentalTool = ref<HTMLElement | null>(null)
const scrollEffects = ref<(HTMLElement | void)[]>([])
const clinicsListAttr = ref()

const getCoverImage = computed(() => ({
  url: $composeImageUri(coverPage?.url as string),
  alt: coverPage?.alternativeText
}))

const getPhoneListSize = computed(() => isResponsiveSm.value ? 'small' : 'normal')

const scrollAnimationsHandler = () : void => {
  resetAnimation()

  nextTick(() => {
    const _headerSize = NavHeader[isResponsiveSm.value ? 'Normal' : 'Mobile']
    const _windowHeight:number = window.innerHeight

    if (!isResponsiveMd.value) {
      const _dentalToolHeight:number = (dentalTool.value as HTMLElement).offsetHeight
      const _dentalToolTop:number = _headerSize - DefaultValues.Padding200
      const _toValue:number = (_dentalToolHeight - _windowHeight) + _dentalToolTop

      const plxOption = ({
        dataTween: {
          fn: 'fromTo',
          el: (dentalTool.value as HTMLElement),
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
    @include mediaMd {
      padding: 0 $space-400;
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
      @include mediaMd {
        @include viewport-height;
        padding: $--desktop-cover-top-padding 0 $space-400;
        max-width: $breakpoint-400;
        margin: 0 auto;
      }
    }

    #{$self}__client-box {
      overflow: hidden;
      @include mediaMd {
        background-color: $color-white;
        border-radius: $radius-200;
        padding: $space-400;
        display: grid;
        place-items: center;
      }
      &-inner {
        height: 100%;
        width: 100%;
        @include mediaMd {
          display: flex;
          width: auto;
          overflow: hidden;
        }
      }
      &-logo {
        height: 100%;
        width: 100%;
        @include mediaMd {
          z-index: 0;
          transform: translateX(-30%);
        }
        img {
          height: 100%;
          width: 100%;

          @include mediaMd {
            width: auto;
          }
        }
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
      @include mediaMd {
        height: 100%;
        padding: 0;
        transform: translateX(10%);
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: right top;
        transform: scaleX(-1);
        border-radius: $radius-200;

        @include mediaMd {
          width: auto;
          object-position: center center;
        }
      }
    }

    #{$self}__clinic-list {
      display: grid;
      justify-content: center;
      @include mediaSm {
        grid-template-columns: repeat(2, 1fr);
      }
      @include mediaMd {
        display: flex;
        justify-content: space-around;
      }
      > li {
        display: flex;
        column-gap: $space-200;
        .ds-icon-location {
          color: $color-tertiary;
          font-size: $icon-size-400;
          margin-top: $space-050;
        }
        @include mediaMd {
          max-width: rem(360);
        }
      }
      > li + li {
        margin-top: $space-200;
        @include mediaSm {
          margin: 0 0 0 $space-200;
        }
        @include mediaMd {
          margin: 0;
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

  &__therapies {
    background-color: $color-white;
    padding: calc(#{$space-400} - #{$space-200}) $space-200 $space-900;
    @include mediaSm {
      padding: $space-400 $space-400 $space-900;
    }
    @include mediaMd {
      padding: $space-600 $space-400 $space-1000;
    }
    &-inner {
      @include mediaMd {
        margin: 0 auto;
        max-width: $breakpoint-400;
      }
    }
    &-title {
      @include mediaSm {
        padding-bottom: $space-200;
      }
      @include mediaMd {
        padding-bottom: $space-400;
      }
    }
    &-link {
      padding-top: $space-400;
      display: flex;
      justify-content: center;

      @include mediaSm {
        padding-top: $space-500;
      }

      @include mediaMd {
        padding-top: $space-600;
      }
    }
  }
}
</style>
