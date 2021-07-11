<template>
  <div class="accounts">
    <v-container class="accounts__container" v-if="is_loaded">
      <v-row justify="start">
        <account-card
          v-for="card in cards"
          :key="card.id"
          :client="card.client_name"
          :phone="card.person_phone"
          :state="card.meeting_state"
          :city="card.client_city"
          :place="card.meeting_place"
          :date="card.meeting_date"
          :product="'stg' in card ? card.stg[0] : '' || ''"
          :bank="card.bank_name"
        ></account-card>
      </v-row>
    </v-container>
    <loading-placeholders v-else></loading-placeholders>
  </div>
</template>

<script>
import Loaders from "@/components/loading-placeholders";
import AccountCard from "@/components/account-card";
export default {
  name: "Accounts",
  data() {
    return {
      is_loaded: false,
    };
  },
  mounted() {
    this.$store.dispatch("getAccountCards").then(() => (this.is_loaded = true));
  },
  computed: {
    cards: function () {
      return this.$store.state.account_cards;
    },
  },
  components: {
    "loading-placeholders": Loaders,
    "account-card": AccountCard,
  },
};
</script>

<style lang="scss" scoped></style>
