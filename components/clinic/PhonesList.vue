<template lang="pug">
ul
  li(v-for="item in phonesList" :key="item")
    div(
      v-if="clinicAttr[item]"
      :class="{ 'clinic-item__mobile': isMobile(item) }")
      UiDsLink(
        :to="`${phoneLink(item)}+39${clinicAttr[item]}`"
        :size="size"
        :name="$phoneFormatter[item](clinicAttr[item])"
        :arrow-icon="hasIcon"
        :type="type")
      img(
        v-if="isMobile(item)"
        :class="`clinic-item__whatsapp--${size}`"
        src="images/whatsapp-logo.svg"
        alt="whatsapp")
</template>

<script setup lang="ts">
import type { IClinicPhone } from '@/types/contacts'
import { PHONES_TYPE, DS_LINK_TYPE, DS_LINK_SIZE } from '@/constants'

const PhonesProps = defineProps({
  clinicAttr: {
    type: Object,
    required: true
  },

  hasIcon: {
    type: Boolean,
    required: false,
    default: false
  },

  size: {
    type: String,
    required: false,
    default: DS_LINK_SIZE.SMALL,
    validator: (value: string) => (Object.values(DS_LINK_SIZE) as string[]).includes(value)
  },

  type: {
    type: String,
    required: false,
    default: DS_LINK_TYPE.PRIMARY,
    validator: (value: string) => (Object.values(DS_LINK_TYPE) as string[]).includes(value)
  }
})

const { $phoneFormatter } = useNuxtApp()
const phonesList = (Object.values(PHONES_TYPE) as IClinicPhone[])

const isMobile = (value: string) => value === PHONES_TYPE.MOBILE
const phoneLink = (value: string) => isMobile(value) ? 'https://wa.me/' : 'tel:'
</script>

<style lang="scss" scoped>
.clinic-item {
  $self: &;
  &__mobile {
    display: flex;
    column-gap: $space-100;
    #{$self}__whatsapp {
      &--small {
        height: rem(17);
        @include mediaSm {
          height: rem(24);
        }
      }
      &--normal {
        height: rem(24);
        @include mediaSm {
          height: rem(32);
        }
      }
    }
  }
}
</style>
