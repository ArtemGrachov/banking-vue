<script setup lang="ts">
import { computed, ref } from 'vue';
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';

import { EStatus } from '@/constants/status';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import Input from '@/components/inputs/Input.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';

import type { IFormLogin } from '@/types/forms/form-login';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormLogin): any;
}

const { statusMessage, submitStatus } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const fieldLogin = ref('test@test.com');
const fieldPassword = ref('Test123#');

const rules = computed(() => ({
  login: {
    required,
  },
  password: {
    required,
  },
}));

const v$ = useVuelidate(rules, {
  login: fieldLogin,
  password: fieldPassword,
});

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
})

const submitHandler = async () => {
  if (isProcessing.value || !(await v$.value.$validate())) {
    return;
  }

  emits('submit', {
    login: fieldLogin.value,
    password: fieldPassword.value,
  });
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormStatus v-if="statusMessage" :status="submitStatus">
      {{ statusMessage }}
    </FormStatus>
    <FormField
      :label-attrs="{ for: 'login' }"
      :input="v$.login"
    >
      <template #label>
        {{ $t('form_login.login') }}
      </template>
      <template #default="{ classNames }">
        <Input
          id="login"
          v-model="fieldLogin"
          :class="classNames"
          :readonly="isProcessing"
          @blur="v$.login.$touch()"
        />
      </template>
    </FormField>
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
          type="password"
          v-model="fieldPassword"
          :class="classNames"
          :readonly="isProcessing"
          @blur="v$.password.$touch()"
        />
      </template>
    </FormField>
    <div class="submit-row">
      <Button type="submit" variant="primary" :is-processing="isProcessing">
        {{ $t('form_common.submit') }}
      </Button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.submit-row {
  display: flex;
  justify-content: flex-end;
}
</style>
