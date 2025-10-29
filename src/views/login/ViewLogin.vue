<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useLogin } from './composable/login';
import { useGetRoute } from '@/composables/routing/get-route';
import { useToast } from '@/composables/toast/toast';
import FormLogin from '@/components/forms/FormLogin.vue';

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
  <div class="footer">
    <div class="login">
      <RouterLink :to="getRoute({ name: ROUTE_NAMES.REGISTRATION })">
        {{ $t('view_login.registration_link') }}
      </RouterLink>
    </div>
    <div class="forgot">
      <RouterLink :to="getRoute({ name: ROUTE_NAMES.FORGOT_PASSWORD })">
        {{ $t('view_login.forgot_password') }}
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  text-align: center;
  margin-top: 32px;
}

.login {
  margin-bottom: 16px;
}
</style>
