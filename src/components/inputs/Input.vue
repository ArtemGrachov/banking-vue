<script lang="ts" setup>
const model = defineModel();
</script>

<template>
  <input
    type="text"
    class="input"
    v-bind="$attrs"
    v-model="model"
  />
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/inputs.scss' as inputs;

.input {
  @include inputs.default();
}
</style>
