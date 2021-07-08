<template>
  <v-tabs>
    <v-tab v-for="tab in tabs" :key="tab.key" :to="'/' + tab.key" exact>
      {{ tab.name }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "tabs",
  computed: {
    tabs: function () {
      return this.$store.state.tabs;
    },
  },
};
</script>

<style scoped></style>
