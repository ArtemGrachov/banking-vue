<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useRegistration } from './composable/registration';
import { useRegistrationCode } from './composable/registration-code';
import { useRegistrationConfirmation } from './composable/registration-confirmation';
import { useGetRoute } from '@/composables/routing/get-route';
import { useToast } from '@/composables/toast/toast';
import FormRegistration from '@/components/forms/FormRegistration.vue';
import Confirmation from '@/components/auth/confirmation/Confirmation.vue';
import { useShowConfirmation } from '@/components/auth/confirmation/composables/show-confirmation';
import { useInitConfirmation } from '@/components/auth/confirmation/composables/init-confirmation';
import AuthLinks from '@/components/auth/confirmation/AuthLinks.vue';

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
    <AuthLinks :is-registration="true" />
  </template>
</template>

<style lang="scss" scoped>
.login {
  margin-bottom: 16px;
}
</style>
