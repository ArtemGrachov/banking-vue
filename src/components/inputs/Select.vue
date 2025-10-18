<script setup lang="ts">
import { ref } from 'vue';
import Multiselect from 'vue-multiselect';

const value = ref(null);
const options = ref(['list', 'of', 'options']);
</script>

<template>
  <multiselect
    v-model="value"
    :options="options"
    class="select"
  ></multiselect>
</template>

<style lang="scss" scoped>
@use '/src/styles//mixins/dropdowns.scss' as dropdowns;

.select {
  position: relative;
  display: block;
  width: 100%;
  height: 42px;
  border: 1px solid black;
  transition: 200ms;
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.05em;
  border-radius: 4px;
  color: #2a2a2a;
  display: flex;
  align-items: center;

  &.multiselect--active {
    border-color: blue;
  }

  :deep() {
    .multiselect__content-wrapper {
      @include dropdowns.dropdown();

      position: absolute;
      top: calc(100% + 8px);
    }

    .multiselect__tags,
    .multiselect__placeholder,
    .multiselect__single {
      height: 100%;
    }

    .multiselect__placeholder,
    .multiselect__single {
      display: flex;
      align-items: center;
      padding: 0 16px;
    }

    .multiselect__input {
      height: 100%;
      padding: 0 16px;
      font-size: 14px;
      font-family: 'Raleway', sans-serif;
      letter-spacing: 0.05em;
      border: none;
      background: none;

      &:focus {
        outline: none;
      }
    }

    .multiselect__content {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .multiselect__option {
      @include dropdowns.content();

      transition: 200ms;
      color: #2a2a2a;
      cursor: pointer;
      display: block;

      &:hover {
        background: blue;
        color: white;
      }
    }

    .multiselect-enter-active,
    .multiselect-leave-active {
      @include dropdowns.dropdown-open();
    }

    .multiselect-enter-from,
    .multiselect-leave-to {
      @include dropdowns.dropdown-closed();
    }
  }
}
</style>
