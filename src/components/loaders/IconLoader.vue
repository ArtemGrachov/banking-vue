<template>
  <span class="material-symbols-outlined icon-loader">
    hourglass_bottom
  </span>
</template>

<style lang="scss" scoped>
.icon-loader {
  animation-name: icon-loader;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  line-height: 1;
}

@keyframes icon-loader {
  50%, 70% {
    transform: rotate(180deg);
  }

  71% {
    transform: rotate(0);
  }
}
</style>
