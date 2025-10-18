<script lang="ts" setup>
import type { LabelHTMLAttributes } from 'vue';

interface IProps {
  labelAttrs?: LabelHTMLAttributes;
}

const props = defineProps<IProps>();

</script>

<template>
  <div class="form-field">
    <label v-if=$slots.label class="label" v-bind="props.labelAttrs">
      <slot name="label" />
    </label>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/forms.scss' as forms;

.form-field {
  margin-bottom: 24px;
}

.label {
  @include forms.field-label();
}
</style>
