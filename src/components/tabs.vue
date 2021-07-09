<template>
  <v-tabs>
    <v-tab
      v-for="tab in tabs"
      :key="tab.key"
      :to="'/' + tab.key"
      class="tabs__item tab"
      @contextmenu.prevent="closeTab(tab.key)"
      exact
    >
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
  methods: {
    closeTab: function (key) {
      if (key !== "" && key !== "accounts") {
        this.$store.dispatch("closeTabAndRedirect", key);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
