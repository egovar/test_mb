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
      <button
        v-if="tab.key !== '' && tab.key !== 'accounts'"
        @click.stop.prevent="closeTab(tab.key)"
        class="tab__close-button"
      >
        <v-icon small class="tab__close-icon">mdi-close-box</v-icon>
      </button>
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

<style lang="scss">
.v-app-bar__nav-icon.v-btn--active:not(:hover)::before {
  opacity: 0 !important;
}
.tab {
  position: relative;
  padding: 0 1.5rem;
  &__close-button {
    position: absolute;
    right: 0.25rem;
    color: rgba(0, 0, 0, 0.54);
    margin-left: 1rem;
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
