<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useResetPassword } from './composable/reset-password';
import { useToast } from '@/composables/toast/toast';
import FormResetPassword from '@/components/forms/FormResetPassword.vue';
import { useGetRoute } from '@/composables/routing/get-route';

import type { IFormLogin } from '@/types/forms/form-login';

const router = useRouter();
const getRoute = useGetRoute();
const { submit, submitStatus, statusMessage } = useResetPassword();
const toast = useToast();
const { t } = useI18n();

const submitHandler = async (formValue: IFormLogin) => {
  try {
    await submit(formValue);
    toast.success(t('view_reset_password.success'));
    router.push(getRoute({ name: ROUTE_NAMES.LOGIN }));
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'), { position: 'top-right', pauseOnHover: true });
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <FormResetPassword
        :submit-status="submitStatus"
        :status-message="statusMessage"
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
