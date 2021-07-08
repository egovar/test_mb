<template>
  <v-main id="requests" class="requests">
    <v-container class="requests__container">
      <request-card
        v-for="card in cards"
        :name="card.client_name"
        :phone="card.person_phone"
        :num="card.num"
        :product="'stg' in card ? card.stg[0] : ''"
        :state="card.state"
        :dadd="card.dadd"
        :card_id="card.id"
        :key="card.id"
      ></request-card>
    </v-container>
  </v-main>
</template>

<script>
import RequestCard from "@/components/request-card";
export default {
  name: "Requests",
  mounted() {
    this.$store.dispatch("getRequestCards");
  },
  computed: {
    cards: function () {
      return this.$store.getters.getRequestCards;
    },
  },
  components: {
    "request-card": RequestCard,
  },
};
</script>

<style lang="scss" scoped>
.requests {
  &__container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 25%);
  }
}
</style>
