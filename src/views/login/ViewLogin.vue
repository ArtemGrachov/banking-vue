<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useLogin } from './composable/login';
import { useGetRoute } from '@/composables/routing/get-route';

import type { IFormLogin } from '@/types/forms/form-login';
import FormLogin from '@/components/forms/FormLogin.vue';

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
  <div class="page">
    <div class="container">
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

.footer {
  text-align: center;
  margin-top: 32px;
}

.login {
  margin-bottom: 16px;
}
</style>
