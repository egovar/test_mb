<template>
  <v-col align-self="stretch" md="3" sm="4" cols="12">
    <v-card class="account-card" elevation="2" height="100%">
      <v-card-title class="account-card__title"> {{ client }} </v-card-title>
      <v-card-subtitle class="account-card__subtitle">
        +{{ phone }}
      </v-card-subtitle>
      <v-card-text class="account-card__info">
        <span class="account-card__product">{{ product }}</span>
        <span class="account-card__bank">{{ bank }}</span>
        <v-chip :class="'account-card__chip_' + state">{{ state }}</v-chip>
        <span class="account-card__meeting-place">{{ city }}, {{ place }}</span>
        <span class="account-card__meeting-date">{{ meeting_date }}</span>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import df from "dateformat";
export default {
  name: "account-card",
  props: [
    "client",
    "phone",
    "bank",
    "city",
    "date",
    "place",
    "product",
    "state",
  ],
  computed: {
    meeting_date() {
      return df(Date.parse(this.date), "dd.mm.yyyy - HH:MM");
    },
  },
};
</script>

<style lang="scss" scoped>
.account-card {
  &__chip {
    &_error {
      background-color: rgb(255, 92, 0) !important;
      color: rgba(255, 255, 255, 0.95) !important;
    }
    &_process {
      background-color: rgb(0, 87, 255) !important;
      color: rgba(255, 255, 255, 0.95) !important;
    }
    &_upload_docs {
      background-color: yellow !important;
    }
    &_reupload_fls {
      background-color: darksalmon !important;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    & > *:not(:last-child):not(:empty) {
      margin-bottom: 0.2rem;
    }
    & > .account-card__product:not(:empty) {
      margin-bottom: 0.5rem;
    }
  }
  &__title {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &__subtitle {
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
