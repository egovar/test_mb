<template>
  <v-card
    class="request-card"
    :class="'request-card_' + state"
    elevation="2"
    :to="'/requests/' + card_id"
  >
    <span class="request-card__number">№{{ num }} </span>
    <v-card-title class="request-card__title"> {{ name }} </v-card-title>
    <v-card-subtitle class="request-card__subtitle">
      +{{ phone }}
    </v-card-subtitle>
    <v-card-text>{{ product }}</v-card-text>
    <span class="request-card__add-date">{{ add_date_str }}</span>
  </v-card>
</template>

<script>
import df from "dateformat";
export default {
  name: "request-card",
  props: ["name", "phone", "product", "num", "state", "dadd", "card_id"],
  computed: {
    add_date_str() {
      return df(Date.parse(this.dadd), "dd.mm.yyyy - HH:MM");
    },
  },
};
</script>

<style lang="scss" scoped>
.request-card {
  position: relative;
  &_init {
    border-left: 0.5rem solid rgb(0, 87, 255);
  }
  &_err {
    border-left: 0.5rem solid rgb(255, 92, 0);
  }
  &_fin {
    border-left: 0.5rem solid #82d641;
  }
  &__number {
    position: absolute;
    top: 0;
    right: 0.5rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.375rem;
    color: rgba(0, 0, 0, 0.6);
  }
  &__title {
    padding-top: 1.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
  &__add-date {
    position: absolute;
    bottom: 0;
    right: 0.5rem;
    font-size: 0.7rem;
    font-weight: 400;
    line-height: 1.375rem;
    color: rgba(0, 0, 0, 0.6);
    margin-left: auto;
  }
  &__subtitle {
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
