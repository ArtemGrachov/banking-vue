<script setup lang="ts">
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers, requiredIf } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';

import { EStatus } from '@/constants/status';
import { EPasswordResetBy } from '@/constants/password-reset';
import { PHONE_MASK, REGEXP_PHONE } from '@/validation/phone';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import Input from '@/components/inputs/Input.vue';
import InputMask from '@/components/inputs/InputMask.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';
import FormStatus from '@/components/forms/FormStatus.vue';

import type { IFormForgotPassword } from '@/types/forms/form-forgot-password';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
  blocked?: boolean;
  countdown?: number;
}

type Emits = {
  (e: 'submit', formValue: IFormForgotPassword): any;
}

const { t } = useI18n();
const { statusMessage, submitStatus, blocked, countdown } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const fieldResetBy = ref(EPasswordResetBy.EMAIL);
const fieldEmail = ref('');
const fieldPhoneNumber = ref('');

const phoneValidator = helpers.regex(REGEXP_PHONE);

const rules = computed(() => ({
  reset_by: {
    required,
    minLength: minLength(3),
  },
  email: {
    required: requiredIf(() => fieldResetBy.value === EPasswordResetBy.EMAIL),
    email,
  },
  phone_number: {
    required: requiredIf(() => fieldResetBy.value === EPasswordResetBy.PHONE),
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

const isSubmitted = computed(() => {
  return submitStatus != EStatus.INIT;
});

const submitHandler = async () => {
  if (blocked || isProcessing.value || !(await v$.value.$validate())) {
    return;
  }

  emits('submit', {
    reset_by: fieldResetBy.value,
    email: fieldEmail.value,
    phone_number: fieldPhoneNumber.value,
  });
}

const submitLabel = computed(() => {
  if (isSubmitted.value) {
    if (countdown) {
      return t('form_common.resend_timer', { time: countdown });
    }

    return t('form_common.resend');
  }

  return t('form_common.submit');
})
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
          :value="EPasswordResetBy.EMAIL"
          v-model="fieldResetBy"
        >
          {{ $t('form_forgot_password.reset_by_email') }}
        </InputRadio>
        <InputRadio
          id="reset_by_phone"
          name="reset_by"
          :value="EPasswordResetBy.PHONE"
          v-model="fieldResetBy"
        >
          {{ $t('form_forgot_password.reset_by_phone') }}
        </InputRadio>
      </div>
    </FormField>
    <FormField
      v-if="fieldResetBy === EPasswordResetBy.EMAIL"
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
      v-if="fieldResetBy === EPasswordResetBy.PHONE"
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
    <slot />
    <Button
      type="submit"
      variant="primary"
      :disabled="blocked"
      :is-processing="isProcessing"
    >
      {{ submitLabel }}
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
