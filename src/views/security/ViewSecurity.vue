<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useSecurity } from './composable/security';
import { useSecurityCode } from './composable/security-code';
import { useSecurityConfirmation } from './composable/security-confirmation';
import { useToast } from '@/composables/toast/toast';
import { useShowConfirmation } from '@/components/auth/confirmation/composables/show-confirmation';
import { useInitConfirmation } from '@/components/auth/confirmation/composables/init-confirmation';

import Confirmation from '@/components/auth/confirmation/Confirmation.vue';
import FormSecurity from '@/components/forms/FormSecurity.vue';
import Button from '@/components/buttons/Button.vue';

import type { IFormSecurity } from '@/types/forms/form-security';

const router = useRouter();
const toast = useToast();

const { t } = useI18n();
const { submit, submitStatus, statusMessage } = useSecurity();
const registrationConfirmation = useSecurityConfirmation();
const registrationCode = useSecurityCode(() => {
  toast.success(codeStatusMessage.value = t('view_security.success'));
  returnHandler();
});

const showConfirmation = useShowConfirmation();
const initConfirmation = useInitConfirmation();
const codeStatusMessage = ref<string | null>(null);

const submitHandler = async (formValue: IFormSecurity) => {
  try {
    await submit(formValue);
    toast.success(t('view_security.confirmation_success'));
    initConfirmation('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'));
  }
}

const returnHandler = () => {
  router.push({
    query: {
      confirmationToken: undefined,
      codeToken: undefined,
    },
  });
}
</script>

<template>
  <div class="page">
    <div class="container">
      <template v-if="showConfirmation">
        <Button type="button" variant="transparent" @click="returnHandler">
          <span class="material-symbols-outlined">
            arrow_back
          </span>
          {{ $t('view_security.return') }}
        </Button>
        <Confirmation
          :code-submit-callback="registrationCode.submit"
          :confirmation-submit-callback="registrationConfirmation.submit"
        />
      </template>
      <FormSecurity
        v-else
        :submit-status="submitStatus"
        :status-message="statusMessage || codeStatusMessage"
        @submit="submitHandler"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  @include layout.page-default();
}

.container {
  @include layout.container(400px);
}
</style>
