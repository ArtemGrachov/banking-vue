<script setup lang="ts">
import { useValidationMessages } from '@/composables/validation/validation-messages';
import type { Validation } from '@vuelidate/core';

interface IProps {
  input?: Validation<any, any> | Record<string, any>;
  customValidationMessages?: Record<string, string>;
}

const { input, customValidationMessages } = defineProps<IProps>();

const messages = useValidationMessages(input, customValidationMessages);
</script>

<template>
  <div v-if="messages.length" class="form-field-error">
    {{ messages[0] }}
  </div>
</template>

<style lang="scss" scoped>
.form-field-error {
  margin-top: 12px;
  font-size: 14px;
  color: red;
  letter-spacing: 0.05em;
}
</style>
