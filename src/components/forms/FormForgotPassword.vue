<script setup lang="ts">
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers, requiredIf } from '@vuelidate/validators';

import { EStatus } from '@/constants/status';
import { PHONE_MASK, REGEXP_PHONE } from '@/validation/phone';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import Input from '@/components/inputs/Input.vue';
import InputMask from '@/components/inputs/InputMask.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';
import FormStatus from '@/components/forms/FormStatus.vue';

import type { IFormForgotPassword } from '@/types/forms/form-forgot-password';

const enum EResetBy {
  PHONE = 'phone',
  EMAIL = 'email',
}

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormForgotPassword): any;
}

const { statusMessage, submitStatus } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const fieldResetBy = ref(EResetBy.EMAIL);
const fieldEmail = ref('');
const fieldPhoneNumber = ref('');

const phoneValidator = helpers.regex(REGEXP_PHONE);

const rules = computed(() => ({
  reset_by: {
    required,
    minLength: minLength(3),
  },
  email: {
    required: requiredIf(() => fieldResetBy.value === EResetBy.EMAIL),
    email,
  },
  phone_number: {
    required: requiredIf(() => fieldResetBy.value === EResetBy.PHONE),
    phone: phoneValidator,
  },
}));

const v$ = useVuelidate(rules, {
  reset_by: fieldResetBy,
  email: fieldEmail,
  phone_number: fieldPhoneNumber,
});

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
});

const submitHandler = async () => {
  if (isProcessing.value || !(await v$.value.$validate())) {
    return;
  }

  emits('submit', {
    reset_by: fieldResetBy.value,
    email: fieldEmail.value,
    phone_number: fieldPhoneNumber.value,
  });
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormField class="reset-by">
      <template #label>
        {{ $t('form_forgot_password.reset_by') }}
      </template>
      <div class="option-row">
        <InputRadio
          id="reset_by_email"
          name="reset_by"
          :value="EResetBy.EMAIL"
          v-model="fieldResetBy"
        >
          {{ $t('form_forgot_password.reset_by_email') }}
        </InputRadio>
        <InputRadio
          id="reset_by_phone"
          name="reset_by"
          :value="EResetBy.PHONE"
          v-model="fieldResetBy"
        >
          {{ $t('form_forgot_password.reset_by_phone') }}
        </InputRadio>
      </div>
    </FormField>
    <FormField
      v-if="fieldResetBy === EResetBy.EMAIL"
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
      v-if="fieldResetBy === EResetBy.PHONE"
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
    <Button type="submit" variant="primary" :is-processing="isProcessing">
      {{ $t('form_common.submit') }}
    </Button>
    <FormStatus v-if="statusMessage" :status="submitStatus" class="status">
      {{ statusMessage }}
    </FormStatus>
  </form>
</template>

<style lang="scss" scoped>
.reset-by {
  --label-text-align: center;
}

.option-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.status {
  margin-top: 16px;
}
</style>
