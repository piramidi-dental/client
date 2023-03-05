
<template lang="pug">
NuxtLink.ds-link(
  :to="to"
  :class="getClassModifiers"
  :target="target")
  span.ds-icon-arrow-up(v-if="arrowIcon")
  | {{ name }}
</template>

<script setup lang="ts">
import { DS_LINK_TYPE, DS_LINK_SIZE } from '@/constants'

const linkProps = defineProps({
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
    default: DS_LINK_TYPE.PRIMARY,
    validator: (value: string) => (Object.values(DS_LINK_TYPE) as string[]).includes(value)
  },
  size: {
    type: String,
    required: false,
    default: DS_LINK_SIZE.NORMAL,
    validator: (value: string) => (Object.values(DS_LINK_SIZE) as string[]).includes(value)
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
  `ds-link--${linkProps.type}`,
  `ds-link--size-${linkProps.size}`,
  { 'ds-link--disable': linkProps.disable },
  { 'ds-link--has-icon': linkProps.arrowIcon }
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
      @include mediaSm {
        @include txt-title-400;
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
