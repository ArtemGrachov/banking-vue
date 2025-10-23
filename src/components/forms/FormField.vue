<script lang="ts" setup>
import { computed, type LabelHTMLAttributes } from 'vue';
import type { Validation } from '@vuelidate/core';

import FormFieldError from '@/components/forms/FormFieldError.vue';

interface IProps {
  labelAttrs?: LabelHTMLAttributes;
  input?: Validation<any, any> | Record<string, any>;
}

const { labelAttrs, input } = defineProps<IProps>();

const showErrors = computed(() => {
  if (!input) {
    return false;
  }

  return input.$dirty && input.$invalid;
});

const showValid = computed(() => {
  if (!input) {
    return false;
  }

  return input.$dirty && !input.$invalid;
});

const classNames = computed(() => {
  return {
    _invalid: showErrors.value,
    _valid: showValid.value,
  };
});
</script>

<template>
  <div class="form-field">
    <label v-if=$slots.label class="label" v-bind="labelAttrs">
      <slot name="label" />
      <span v-if="input?.required" class="required material-symbols-outlined">
        asterisk
      </span>
    </label>
    <slot :show-errors="showErrors" :show-valid="showValid" :class-names="classNames" />
    <div v-if="$slots.hint" class="hint">
      <slot name="hint" />
    </div>
    <FormFieldError v-if="showErrors" :input="input" />
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/forms.scss' as forms;
@use '/src/styles/mixins/texts.scss' as texts;

.form-field {
  margin-bottom: 24px;
}

.label {
  @include forms.field-label();
}

.required {
  color: red;
  font-size: 12px;
}

.hint {
  @include texts.secondary();

  margin-top: 12px;
}
</style>
