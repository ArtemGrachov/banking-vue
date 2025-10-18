<template>
  <footer class="footer">
    <div class="container">
      Designed and developed by <a href="https://github.com/ArtemGrachov" target="_blank">Artem Hrachov</a>, 2025
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.footer {
  background: black;
  color: white;
  padding: 32px 0;
  text-align: right;
}

.container {
  @include layout.container();
}
</style>
