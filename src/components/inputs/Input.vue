<template>
  <input type="text" class="input">
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/inputs.scss' as inputs;

.input {
  @include inputs.default();
}
</style>
