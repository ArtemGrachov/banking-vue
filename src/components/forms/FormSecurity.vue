<script setup lang="ts">
import { computed, ref } from 'vue';
import { required, email, helpers, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';

import { EStatus } from '@/constants/status';
import { PHONE_MASK, REGEXP_PHONE } from '@/validation/phone';

import { usePasswordValidators } from '@/composables/validation/password-validators';
import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import Input from '@/components/inputs/Input.vue';
import InputMask from '@/components/inputs/InputMask.vue';
import PasswordHints from '@/components/inputs/PasswordHints.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';

import type { IFormSecurity } from '@/types/forms/form-security';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormSecurity): any;
}

const { statusMessage, submitStatus } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const passwordValidators = usePasswordValidators();

const fieldEmail = ref('test@test.com');
const fieldPhoneNumber = ref('+380991112233');
const fieldPassword = ref('');
const fieldPasswordRepeat = ref('');

const phoneValidator = helpers.regex(REGEXP_PHONE);

const rules = computed(() => ({
  email: {
    required,
    email,
  },
  phone_number: {
    required,
    phone: phoneValidator,
  },
  password: passwordValidators,
  passwordRepeat: {
    required,
    passwordMatch: sameAs(fieldPassword, 'password'),
  },
}));

const v$ = useVuelidate(rules, {
  email: fieldEmail,
  phone_number: fieldPhoneNumber,
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
    email: fieldEmail.value,
    phone_number: fieldPhoneNumber.value,
  });
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormStatus v-if="statusMessage" :status="submitStatus">
      {{ statusMessage }}
    </FormStatus>
    <FormField
      :label-attrs="{ for: 'email' }"
      :input="v$.email"
    >
      <template #label>
        {{ $t('form_common.email') }}
      </template>
      <template #default="{ classNames }">
        <Input
          id="email"
          v-model="fieldEmail"
          :class="classNames"
          :readonly="isProcessing"
          @blur="v$.email.$touch()"
        />
      </template>
    </FormField>
    <FormField
      :label-attrs="{ for: 'phone_number' }"
      :input="v$.phone_number"
    >
      <template #label>
        {{ $t('form_common.phone_number') }}
      </template>
      <template #default="{ classNames }">
        <InputMask
          id="phone_number"
          v-model="fieldPhoneNumber"
          :class="classNames"
          :mask-or-alias="PHONE_MASK"
          :readonly="isProcessing"
          @blur="v$.phone_number.$touch()"
        />
      </template>
      <template #hint>
        {{ $t('common_validation.phone_hint') }}
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
        <PasswordHints v-slot="{ onBlur, onFocus }" :input="v$.password">
          <InputPassword
            id="password"
            v-model="fieldPassword"
            :input-attrs="{ class: classNames }"
            :readonly="isProcessing"
            @blur="v$.password.$touch(); onBlur()"
            @focus="onFocus"
          />
        </PasswordHints>
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
