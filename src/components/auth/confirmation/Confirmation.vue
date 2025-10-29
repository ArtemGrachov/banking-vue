<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { EConfirmBy } from '@/constants/confirmation';
import { EStatus } from '@/constants/status';

import { useCode } from './composables/code';
import { useConfirmation } from './composables/confirmation';
import FormConfirmationCode from '@/components/forms/FormConfirmationCode.vue';
import FormConfirmation from '@/components/forms/FormConfirmation.vue';
import FormStatus from '@/components/forms/FormStatus.vue';

import type { IFormConfirmation } from '@/types/forms/form-confirmation';
import type { IFormConfirmationCode } from '@/types/forms/form-confirmation-code';

interface IProps {
  confirmationSubmitCallback?: (form: IFormConfirmation) => Promise<any>;
  codeSubmitCallback?: (form: IFormConfirmationCode) => Promise<any>;
}

const {
  confirmationSubmitCallback,
  codeSubmitCallback,
} = defineProps<IProps>();

const { t } = useI18n();
const route = useRoute();

const {
  submitStatus: confirmationSubmitStatus,
  statusMessage: confirmationStatusMessage,
  confirmBy,
  submitHandler: confirmationSubmitHandler,
} = useConfirmation({ confirmationSubmitCallback });
const {
  submitStatus: codeSubmitStatus,
  statusMessage: codeStatusMessage,
  submitHandler: codeSubmitHandler,
} = useCode({ codeSubmitCallback });

const isCode = computed(() => !!route?.query?.codeToken && confirmBy.value === EConfirmBy.PHONE);

const showHintText = computed(() => {
  return confirmationSubmitStatus.value === EStatus.SUCCESS;
})

const hintText = computed(() => {
  switch (confirmBy.value) {
    case EConfirmBy.EMAIL: {
      return t('confirmation.hint_email');
    }
    case EConfirmBy.PHONE: {
      return t('confirmation.hint_sms');
    }
    default: {
      return null;
    }
  }
});
</script>

<template>
  <FormConfirmation
    :submit-status="confirmationSubmitStatus"
    :status-message="confirmationStatusMessage"
    @submit="confirmationSubmitHandler"
  />
  <FormStatus v-if="showHintText" class="hint" :status="EStatus.SUCCESS">
    {{ hintText }}
  </FormStatus>
  <FormConfirmationCode
    v-if="isCode"
    class="form-confirmation-code"
    :submit-status="codeSubmitStatus"
    :status-message="codeStatusMessage"
    @submit="codeSubmitHandler"
  />
</template>

<style lang="scss" scoped>
.form-confirmation-code {
  margin-top: 24px;
}

.hint {
  margin-top: 24px;
}
</style>
