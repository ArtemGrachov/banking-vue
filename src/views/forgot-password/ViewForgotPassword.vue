<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useForgotPassword } from './composable/forgot-password';
import FormForgotPassword from '@/components/forms/FormForgotPassword.vue';
import { useGetRoute } from '@/composables/routing/get-route';

import type { IFormForgotPassword } from '@/types/forms/form-forgot-password';
import { ref } from 'vue';

const router = useRouter();
const getRoute = useGetRoute();
const { submit, submitStatus, statusMessage } = useForgotPassword();
const toast = useToast();
const { t } = useI18n();

const successMessage = ref<string | null>(null);

const submitHandler = async (formValue: IFormForgotPassword) => {
  try {
    await submit(formValue);

    switch (formValue.reset_by) {
      case 'email': {
        toast.success(t('view_forgot_password.success_email'));
        successMessage.value = t('view_forgot_password.description_email');
        break;
      }
      case 'phone': {
        router.push(getRoute({ name: ROUTE_NAMES.FORGOT_PASSWORD_CONFIRMATION }));
        toast.success(t('view_forgot_password.success_sms'));
        break;
      }
    }
  } catch (err) {
    console.error(err);
    successMessage.value = null;
    toast.error(t('common_errors.generic'), { position: 'top-right', pauseOnHover: true });
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <FormForgotPassword
        :submit-status="submitStatus"
        :status-message="statusMessage || successMessage"
        @submit="submitHandler"
      />
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
</style>
