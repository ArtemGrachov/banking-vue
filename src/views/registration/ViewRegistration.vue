<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useRegistration } from './composable/registration';
import { useRegistrationCode } from './composable/registration-code';
import { useRegistrationConfirmation } from './composable/registration-confirmation';
import { useGetRoute } from '@/composables/routing/get-route';
import { useToast } from '@/composables/toast/toast';
import FormRegistration from '@/components/forms/FormRegistration.vue';
import Confirmation from '@/components/auth/confirmation/Confirmation.vue';
import { useShowConfirmation } from '@/components/auth/confirmation/composables/show-confirmation';
import { useInitConfirmation } from '@/components/auth/confirmation/composables/init-confirmation';

import type { IFormRegistration } from '@/types/forms/form-registration';

const getRoute = useGetRoute();
const { submit, submitStatus, statusMessage } = useRegistration();
const toast = useToast();
const { t } = useI18n();

const showConfirmation = useShowConfirmation();
const initConfirmation = useInitConfirmation();
const registrationCode = useRegistrationCode();
const registrationConfirmation = useRegistrationConfirmation();

const submitHandler = async (formValue: IFormRegistration) => {
  try {
    await submit(formValue);
    toast.success(t('view_registration.success'), { position: 'top-right', pauseOnHover: true });
    initConfirmation('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'), { position: 'top-right', pauseOnHover: true });
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <Confirmation
        v-if="showConfirmation"
        :code-submit-callback="registrationCode.submit"
        :confirmation-submit-callback="registrationConfirmation.submit"
      />
      <template v-else>
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
      </template>
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
