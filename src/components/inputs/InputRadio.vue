<script setup lang="ts">
import type { InputHTMLAttributes, LabelHTMLAttributes } from 'vue';

interface IProps {
  inputAttrs?: InputHTMLAttributes;
  labelAttrs?: LabelHTMLAttributes;
  id?: string;
  name?: string;
}

defineProps<IProps>();
</script>

<template>
  <input
    :id="id"
    :name="name"
    type="radio"
    class="input"
    v-bind="inputAttrs"
  />
  <label
    :for="id"
    class="label"
    v-bind="labelAttrs"
  >
    <span class="icon" />
    <div class="content">
      <slot />
    </div>
  </label>
</template>

<style lang="scss" scoped>
.input {
  display: none;

  &:checked {
    &+.label {
      color: blue;

      .icon {
        background: blue;
        border-color: blue;
        box-shadow: inset 0 0 1px 2px white;
      }
    }
  }
}

.label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  transition: 200ms;
  cursor: pointer;

  &:hover {
    color: orangered;
  }

  &:active {
    color: orange;
  }
}

.icon {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  border: 2px solid #434343;
  background: white;
  border-radius: 50%;
  margin-top: 2px;
  transition: 200ms;
}
</style>
