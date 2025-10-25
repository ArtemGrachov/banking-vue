<script setup lang="ts">
import { computed, ref } from 'vue';
import { required, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';

import { EStatus } from '@/constants/status';

import { usePasswordValidators } from '@/composables/validation/password-validators';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';

import type { IFormResetPassword } from '@/types/forms/form-reset-password';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormResetPassword): any;
}

const passwordValidators = usePasswordValidators();
const { statusMessage, submitStatus } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const fieldPassword = ref('');
const fieldPasswordRepeat = ref('');

const rules = computed(() => ({
  password: passwordValidators,
  passwordRepeat: {
    required,
    sameAs: sameAs(fieldPassword, 'password'),
  },
}));

const v$ = useVuelidate(rules, {
  password: fieldPassword,
  passwordRepeat: fieldPasswordRepeat,
});

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
})

const submitHandler = async () => {
  if (isProcessing.value || !(await v$.value.$validate())) {
    return;
  }

  emits('submit', {
    password: fieldPassword.value,
    passwordRepeat: fieldPasswordRepeat.value,
  });
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormStatus v-if="statusMessage" :status="submitStatus">
      {{ statusMessage }}
    </FormStatus>
    <FormField
      :label-attrs="{ for: 'password' }"
      :input="v$.password"
    >
      <template #label>
        {{ $t('form_common.password') }}
      </template>
      <template #default="{ classNames }">
        <InputPassword
          id="password"
          v-model="fieldPassword"
          :input-attrs="{ class: classNames }"
          :readonly="isProcessing"
          @blur="v$.password.$touch()"
        />
      </template>
    </FormField>
    <FormField
      :label-attrs="{ for: 'password_repeat' }"
      :input="v$.passwordRepeat"
    >
      <template #label>
        {{ $t('form_common.password_repeat') }}
      </template>
      <template #default="{ classNames }">
        <InputPassword
          id="password_repeat"
          v-model="fieldPasswordRepeat"
          :input-attrs="{ class: classNames }"
          :readonly="isProcessing"
          @blur="v$.passwordRepeat.$touch()"
        />
      </template>
    </FormField>
    <Button type="submit" variant="primary" :is-processing="isProcessing">
      {{ $t('form_common.submit') }}
    </Button>
  </form>
</template>
