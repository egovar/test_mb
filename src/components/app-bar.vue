<template>
  <v-app-bar class="app-bar" color="#2042ab" app>
    <v-app-bar-nav-icon to="/">
      <img src="@/assets/mb_logo.svg" alt="" />
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-bar",
};
</script>

<style lang="scss" scoped>
.v-app-bar__nav-icon.v-btn--active:not(:hover)::before {
  opacity: 0 !important;
}
</style>
