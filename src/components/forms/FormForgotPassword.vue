<script setup lang="ts">
import { PHONE_MASK } from '@/validation/phone';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import Input from '@/components/inputs/Input.vue';
import InputMask from '@/components/inputs/InputMask.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';

</script>

<template>
  <form @submit.prevent>
    <FormField class="reset-by">
      <template #label>
        {{ $t('form_forgot_password.reset_by') }}
      </template>
      <div class="option-row">
        <InputRadio id="reset_by_email" name="reset_by" :input-attrs="{ checked: true }">
          {{ $t('form_forgot_password.reset_by_email') }}
        </InputRadio>
        <InputRadio id="reset_by_phone" name="reset_by">
          {{ $t('form_forgot_password.reset_by_phone') }}
        </InputRadio>
      </div>
    </FormField>
    <FormField
      :label-attrs="{ for: 'email' }"
    >
      <template #label>
        {{ $t('form_common.email') }}
      </template>
      <template #default="{ classNames }">
        <Input
          id="email"
          :class="classNames"
        />
      </template>
    </FormField>
    <FormField
      :label-attrs="{ for: 'phone_number' }"
    >
      <template #label>
        {{ $t('form_common.phone_number') }}
      </template>
      <template #default="{ classNames }">
        <InputMask
          id="phone_number"
          :class="classNames"
          :mask-or-alias="PHONE_MASK"
        />
      </template>
    </FormField>
    <Button type="submit" variant="primary">
      {{ $t('form_common.submit') }}
    </Button>
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
</style>
