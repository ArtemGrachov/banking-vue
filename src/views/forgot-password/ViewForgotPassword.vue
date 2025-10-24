<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useI18n } from 'vue-i18n';

import { EConfirmBy } from '@/constants/confirmation';
import { SMS_VALIDATION_TIMEOUT_MS } from '@/constants/sms-validation';
import { EStatus } from '@/constants/status';

import { useForgotPassword } from './composable/forgot-password';
import FormForgotPassword from '@/components/forms/FormForgotPassword.vue';
import CountdownProgress from '@/components/other/CountdownProgress.vue';

import type { IFormForgotPassword } from '@/types/forms/form-forgot-password';

const { submit, submitStatus, statusMessage } = useForgotPassword();
const toast = useToast();
const { t } = useI18n();

const resetBy = ref<EConfirmBy | null>(null);
const successMessage = ref<string | null>(null);
const submittedTimeout = ref<number | null>(null);
const blocked = ref(false);
const countdown = ref(0);

const isSuccess = computed(() => {
  return submitStatus.value === EStatus.SUCCESS;
});

const submitHandler = async (formValue: IFormForgotPassword) => {
  try {
    if (formValue.reset_by) {
      resetBy.value = formValue.reset_by;
    }

    submittedTimeout.value = null;

    await submit(formValue);

    switch (formValue.reset_by) {
      case EConfirmBy.EMAIL: {
        toast.success(t('view_forgot_password.success_email'));
        successMessage.value = t('view_forgot_password.description_email');
        submittedTimeout.value = SMS_VALIDATION_TIMEOUT_MS;
        countdown.value = SMS_VALIDATION_TIMEOUT_MS / 1000;
        blocked.value = true;
        break;
      }
      case EConfirmBy.PHONE: {
        toast.success(t('view_forgot_password.success_sms'));
        break;
      }
    }
  } catch (err) {
    console.error(err);
    successMessage.value = null;
    blocked.value = false;
    toast.error(t('common_errors.generic'), { position: 'top-right', pauseOnHover: true });
  }
}

const endHandler = () => {
  blocked.value = false;
}

const countdownHandler = ({ seconds }: { seconds: number }) => {
  countdown.value = seconds;
}
</script>

<template>
  <div class="page">
    <div class="container">
      <FormForgotPassword
        :submit-status="submitStatus"
        :status-message="statusMessage || successMessage"
        :blocked="blocked"
        :countdown="countdown"
        @submit="submitHandler"
      >
        <CountdownProgress
          v-if="isSuccess"
          class="countdown"
          :time="submittedTimeout"
          @end="endHandler"
          @progress="countdownHandler"
        />
      </FormForgotPassword>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
}

.container {
  @include layout.container(400px);
}

.countdown {
  margin-bottom: 24px;
}
</style>
