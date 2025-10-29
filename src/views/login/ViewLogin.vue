<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useLogin } from './composable/login';
import { useGetRoute } from '@/composables/routing/get-route';
import { useToast } from '@/composables/toast/toast';
import FormLogin from '@/components/forms/FormLogin.vue';
import AuthLinks from '@/components/auth/confirmation/AuthLinks.vue';

import type { IFormLogin } from '@/types/forms/form-login';

const router = useRouter();
const getRoute = useGetRoute();
const { submit, submitStatus, statusMessage } = useLogin();
const toast = useToast();
const { t } = useI18n();

const submitHandler = async (formValue: IFormLogin) => {
  try {
    await submit(formValue);
    router.push(getRoute({ name: ROUTE_NAMES.DASHBOARD }));
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'), { position: 'top-right', pauseOnHover: true });
  }
}
</script>

<template>
  <FormLogin
    :submit-status="submitStatus"
    :status-message="statusMessage"
    @submit="submitHandler"
  />
  <AuthLinks :is-login="true" />
</template>

<style lang="scss" scoped>
.login {
  margin-bottom: 16px;
}
</style>
