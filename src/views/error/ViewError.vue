<template>
  <div class="page">
    error test
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
