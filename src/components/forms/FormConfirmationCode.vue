<script setup lang="ts">
import { computed, ref } from 'vue';
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';

import { EStatus } from '@/constants/status';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import Input from '@/components/inputs/Input.vue';

import type { IFormConfirmationCode } from '@/types/forms/form-confirmation-code';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormConfirmationCode): any;
}

const { statusMessage, submitStatus } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const fieldCode = ref('');
const fieldPassword = ref('');

const rules = computed(() => ({
  code: {
    required,
  },
}));

const v$ = useVuelidate(rules, {
  code: fieldCode,
});

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
})

const submitHandler = async () => {
  if (isProcessing.value || !(await v$.value.$validate())) {
    return;
  }

  emits('submit', {
    code: fieldCode.value,
  });
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormStatus v-if="statusMessage" :status="submitStatus">
      {{ statusMessage }}
    </FormStatus>
    <FormField
      :label-attrs="{ for: 'code' }"
      :input="v$.code"
    >
      <template #label>
        {{ $t('form_common.confirmation_code') }}
      </template>
      <template #default="{ classNames }">
        <Input
          id="code"
          v-model="fieldCode"
          :class="classNames"
          :readonly="isProcessing"
          @blur="v$.code.$touch()"
        />
      </template>
    </FormField>
    <Button type="submit" variant="primary" :is-processing="isProcessing">
      {{ $t('form_common.submit') }}
    </Button>
  </form>
</template>
