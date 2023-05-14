<script setup lang="ts">
const { retriveClinicsData, clinicsList, getContactEmail, getOpeningHours } = useContacts()
if (!clinicsList.value.length) { await retriveClinicsData() }
</script>

<template lang="pug">
.footer-info
  .footer-info__inner
    h2.footer-info__title {{ $t('footer.talk') }}
    ui-ds-link(
      :to="`mailto:${getContactEmail}`"
      :name="getContactEmail"
      size="small"
      target="_blank")
    ul.footer-info__clinics
      li(
        v-for="clinic in clinicsList"
        :key="`${clinic.id}_${clinic.attributes.name}`")
        clinic-item(:clinic-attr="clinic.attributes")
    p.footer-info__opening-hours(v-html="getOpeningHours")
    ui-ds-link.footer-info__contacts-link(
      to="/contacts"
      arrow-icon
      type="tertiary"
      :name="$t('contacts.toContact')")
</template>

<style lang="scss" scoped>
.footer-info {
  @include viewport-height;
  padding: $space-200;
  background-color: $color-secondary-hard-dark;
  display: flex;
  place-items: center;
  @include mediaSm {
    padding: $space-400;
  }
  &__inner {
    width: 100%;
    display: grid;
    align-content: start;
    row-gap: $space-300;
    @include mediaSm {
      row-gap: $space-400;
    }
    @include mediaMd {
      margin: 0 auto;
      max-width: $breakpoint-400;
      grid-template-columns: 1fr auto;
      grid-template-rows: repeat(3, auto) 1fr;
      row-gap: $space-200;
      > *:not(&__clinics) {
        grid-column: 2;
      }
    }
  }
  &__title {
    @include txt-title-500;
    color: $color-white;
  }
  &__clinics {
    @include mediaMd {
      grid-column: 1;
      grid-row: 1 / span 4;
    }

    li {
      @include txt-body-600;
      color: $color-white;
      @include mediaSm {
        @include txt-title-300;
      }
    }

    li + li {
      margin-top: $space-300;
      @include mediaSm {
        margin-top: $space-400;
      }
    }
  }
  &__opening-hours{
    color: $color-neutral;
    @include text-space-wrap;
    @include txt-body-500;
    @include mediaSm {
      @include txt-body-600;
    }
  }
  &__contacts-link {
    @include mediaMd {
      align-self: end;
    }
  }
}
</style>
