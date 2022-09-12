
<template lang="pug">
NuxtLink.ds-link(
  :to="to"
  :class="getClassModifiers"
  :target="target")
  span.ds-icon-arrow-up(v-if="arrowIcon")
  | {{ name }}
</template>

<script setup lang="ts">
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
    default: 'primary',
    validator: (value: string) => [
      'primary', 'secondary', 'tertiary'
    ].includes(value)
  },
  size: {
    type: String,
    required: false,
    default: 'normal',
    validator: (value: string) => ['small', 'normal'].includes(value)
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
}
</style>
