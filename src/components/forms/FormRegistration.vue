<script setup lang="ts">
import { computed, ref } from 'vue';
import { minLength, required, email, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';

import { EStatus } from '@/constants/status';
import { PHONE_MASK, REGEXP_PHONE } from '@/validation/phone';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import Input from '@/components/inputs/Input.vue';
import InputMask from '@/components/inputs/InputMask.vue';

import type { IFormRegistration } from '@/types/forms/form-registration';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormRegistration): any;
}

const { statusMessage, submitStatus } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const fieldFullName = ref('');
const fieldEmail = ref('');
const fieldPhoneNumber = ref('');

const phoneValidator = helpers.regex(REGEXP_PHONE);

const rules = computed(() => ({
  full_name: {
    required,
    minLength: minLength(3),
  },
  email: {
    required,
    email,
  },
  phone_number: {
    required,
    phone: phoneValidator,
  },
}));

const v$ = useVuelidate(rules, {
  full_name: fieldFullName,
  email: fieldEmail,
  phone_number: fieldPhoneNumber,
});

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
})

const submitHandler = async () => {
  if (isProcessing.value || !(await v$.value.$validate())) {
    return;
  }

  emits('submit', {
    full_name: fieldFullName.value,
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
      :label-attrs="{ for: 'full_name' }"
      :input="v$.full_name"
    >
      <template #label>
        {{ $t('form_common.full_name') }}
      </template>
      <template #default="{ classNames }">
        <Input
          id="full_name"
          v-model="fieldFullName"
          :class="classNames"
          :readonly="isProcessing"
          @blur="v$.full_name.$touch()"
        />
      </template>
    </FormField>
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
    <Button type="submit" variant="primary" :is-processing="isProcessing">
      {{ $t('form_common.submit') }}
    </Button>
  </form>
</template>
