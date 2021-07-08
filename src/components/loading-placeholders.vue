<template>
  <transition name="fade">
    <div class="loading-placeholders">
      <div class="loading-placeholders__container">
        <v-progress-circular
          size="60"
          width="10"
          color="rgb(0, 87, 255)"
          indeterminate
        ></v-progress-circular>
        <v-progress-circular
          size="40"
          width="7"
          color="rgb(255, 92, 0)"
          indeterminate
        ></v-progress-circular>
        <v-progress-circular
          size="60"
          width="10"
          color="#82d641"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "loading-placeholders",
};
</script>

<style lang="scss" scoped>
.loading-placeholders {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  top: 100px;
  &__container {
    display: flex;
    width: 250px;
    align-items: center;
    justify-content: space-around;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}
</style>
