<template>
  <footer class="footer">
    Designed and developed by <a href="https://github.com/ArtemGrachov" target="_blank">Artem Hrachov</a>, 2025
  </footer>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.footer {
  background: #141414;
  color: white;
  padding: 24px;
  text-align: center;
  font-size: 14px;

  --link-color: red;

  @include breakpoints.sm() {
    text-align: right;
  }
}

.container {
  @include layout.container();
}
</style>
