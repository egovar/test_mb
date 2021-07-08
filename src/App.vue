<template>
  <v-app id="app" class="app">
    <app-bar></app-bar>
    <v-main>
      <tabs></tabs>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped></style>

<script>
import Appbar from "@/components/app-bar";
import tabs from "@/components/tabs";
export default {
  components: {
    "app-bar": Appbar,
    tabs,
  },
};
</script>
