<script setup lang="ts">
import FormSecurity from '@/components/forms/FormSecurity.vue';
import { useToast } from '@/composables/toast/toast';
import type { IFormSecurity } from '@/types/forms/form-security';

import { useSecurity } from '@/views/security/composable/security';
import { useI18n } from 'vue-i18n';

const { submit, submitStatus, statusMessage } = useSecurity();
const toast = useToast();
const { t } = useI18n();

const submitHandler = async (formValue: IFormSecurity) => {
  try {
    await submit(formValue);
    toast.success(t('view_security.update_success'), { position: 'top-right', pauseOnHover: true });
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'), { position: 'top-right', pauseOnHover: true });
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <FormSecurity
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
  @include layout.page-default();
}

.container {
  @include layout.container(400px);
}
</style>
