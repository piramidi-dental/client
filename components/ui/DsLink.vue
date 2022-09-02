
<template lang="pug">
.ds-link(:class="getClassModifiers")
  span.ds-icon-arrow-up(v-if="arrowIcon")
  NuxtLink(:to="to") {{ name }}
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
    default: 'primary'
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
      @include mediaSm {
        @include txt-title-300;
      }
    }
  }

  &--primary {
    color: $color-white;
  }

  &--secondary {
    color: $color-secondary;
  }

  &--primary,
  &--secondary {
    &:hover,
    &:focus,
    &:active {
      color: $color-tertiary;
    }
  }
}
</style>
