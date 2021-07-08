<template>
  <v-tabs>
    <v-tab
      v-for="tab in tabs"
      :key="tab.key"
      :to="'/' + tab.key"
      class="tabs__item tab"
      exact
    >
      {{ tab.name }}
      <v-icon
        @click="closeTab(tab.key)"
        v-if="tab.key !== '' && tab.key !== 'accounts'"
        class="tab__close-icon"
        small
        >mdi-close-box</v-icon
      >
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
      console.log(key + " tab might be closed(");
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  position: relative;
  &__close-icon {
    position: absolute;
    height: 100%;
    align-items: center;
    right: 0.25rem;
    z-index: 3;
    &:hover {
      &::before {
        color: rgba(0, 0, 0, 0.7);
      }
    }
    &::before {
      color: rgba(0, 0, 0, 0.54);
      margin-bottom: -2px;
    }
  }
}
</style>
