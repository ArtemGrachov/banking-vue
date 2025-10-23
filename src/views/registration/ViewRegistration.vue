<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useRegistration } from './composable/registration';
import { useGetRoute } from '@/composables/routing/get-route';
import FormRegistration from '@/components/forms/FormRegistration.vue';

import type { IFormRegistration } from '@/types/forms/form-registration';

const router = useRouter();
const getRoute = useGetRoute();
const { submit, submitStatus, statusMessage } = useRegistration();
const toast = useToast();
const { t } = useI18n();

const submitHandler = async (formValue: IFormRegistration) => {
  try {
    await submit(formValue);
    router.push(getRoute({ name: ROUTE_NAMES.REGISTRATION_CONFIRMATION }));
    toast.success(t('view_registration.success'), { position: 'top-right', pauseOnHover: true });
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'), { position: 'top-right', pauseOnHover: true });
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <FormRegistration
        :submit-status="submitStatus"
        :status-message="statusMessage"
        @submit="submitHandler"
      />
      <div class="footer">
        <div class="login">
          {{ $t('view_registration.login_label') }}
          <RouterLink :to="getRoute({ name: ROUTE_NAMES.LOGIN })">
            {{ $t('view_registration.login_link') }}
          </RouterLink>
        </div>
        <div class="forgot">
          <RouterLink :to="getRoute({ name: ROUTE_NAMES.FORGOT_PASSWORD })">
            {{ $t('view_registration.forgot_password') }}
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
