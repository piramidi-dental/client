
<template lang="pug">
nuxt-link.ds-link(
  :to="to"
  :class="getClassModifiers"
  :target="target")
  span.ds-icon-arrow-up-right(v-if="arrowIcon")
  | {{ name }}
</template>

<script setup lang="ts">
import { DsLinkType, DsLinkSize } from '@/types/enums'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: DsLinkType.Primary,
    validator: (value: string) => (Object.values(DsLinkType) as string[]).includes(value)
  },
  size: {
    type: String,
    required: false,
    default: DsLinkSize.Normal,
    validator: (value: string) => (Object.values(DsLinkSize) as string[]).includes(value)
  },
  arrowIcon: {
    type: Boolean,
    required: false,
    default: false
  },
  disable: {
    type: Boolean,
    required: false,
    default: false
  },
  target: {
    type: String,
    required: false,
    default: ''
  }
})

const getClassModifiers = computed(() => [
  `ds-link--${props.type}`,
  `ds-link--size-${props.size}`,
  { 'ds-link--disable': props.disable },
  { 'ds-link--has-icon': props.arrowIcon }
])
</script>

<style lang="scss" scoped>
.ds-link {
  width: fit-content;

  &--has-icon {
    display: flex;
    align-items: center;
  }

  &--disable {
    pointer-events: none;
  }

  &--size {
    &-normal {
      @include txt-title-300;
      column-gap: $space-150;

      [class^='ds-icon-'],
      [class*=' ds-icon-'] {
        font-weight: 700;
      }

      @include mediaSm {
        @include txt-title-400;

        [class^='ds-icon-'],
        [class*=' ds-icon-'] {
          font-weight: 700;
          font-size: $icon-size-400;
        }
      }
    }
    &-small {
      @include txt-body-600;
      column-gap: $space-100;
      [class^='ds-icon-'],
      [class*=' ds-icon-'] {
        font-size: $icon-size-200;
      }
      @include mediaSm {
        @include txt-title-300;
        [class^='ds-icon-'],
        [class*=' ds-icon-'] {
          font-size: $icon-size-300;
        }
      }
    }
  }

  &--primary {
    @include link-primary;
  }

  &--secondary {
    @include link-secondary;
  }

  &--tertiary {
    @include link-tertiary;
  }

  &--neutral {
    @include link-neutral;
  }
}
</style>
