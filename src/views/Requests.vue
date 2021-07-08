<template>
  <v-main id="requests" class="requests">
    <v-container class="requests__container" v-if="is_loaded">
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
    <loading-placeholders v-else></loading-placeholders>
  </v-main>
</template>

<script>
import RequestCard from "@/components/request-card";
import Loaders from "@/components/loading-placeholders";
export default {
  name: "Requests",
  mounted() {
    this.$store.dispatch("getRequestCards").then(() => (this.is_loaded = true));
  },
  data() {
    return {
      is_loaded: false,
    };
  },
  computed: {
    cards: function () {
      return this.$store.getters.getRequestCards;
    },
  },
  components: {
    "request-card": RequestCard,
    "loading-placeholders": Loaders,
  },
};
</script>

<style lang="scss" scoped>
.requests {
  position: relative;
  &__container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 25%);
  }
}
</style>
