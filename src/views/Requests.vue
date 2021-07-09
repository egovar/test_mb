<template>
  <v-main id="requests" class="requests">
    <v-dialog fullscreen transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          class="requests__create-btn"
          color="rgb(32, 66, 171)"
          dark
          v-on="on"
        >
          <v-icon>mdi-file-plus</v-icon>
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="rgb(32, 66, 171)" dark>
            <v-btn icon dark @click="dialog.value = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Новая заявка</v-toolbar-title>
          </v-toolbar>
        </v-card>
      </template>
    </v-dialog>

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
  &__create-btn {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    &:focus::before {
      opacity: 0;
    }
  }
  &__container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 25%);
  }
}
</style>
