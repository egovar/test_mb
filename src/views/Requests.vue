<template>
  <div id="requests" class="requests">
    <create-request-modal></create-request-modal>
    <v-container class="requests__container" v-if="is_loaded">
      <v-row justify="start">
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
      </v-row>
    </v-container>
    <loading-placeholders v-else></loading-placeholders>
  </div>
</template>

<script>
import RequestCard from "@/components/request-card";
import Loaders from "@/components/loading-placeholders";
import CreateRequest from "@/components/create-request-modal";
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
    "create-request-modal": CreateRequest,
  },
};
</script>

<style lang="scss" scoped>
.requests {
  position: relative;
}
</style>
