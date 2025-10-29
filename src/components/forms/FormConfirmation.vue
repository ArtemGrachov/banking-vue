<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { useI18n } from 'vue-i18n';

import { EStatus } from '@/constants/status';
import { EConfirmBy } from '@/constants/confirmation';
import { SMS_VALIDATION_TIMEOUT_MS } from '@/constants/sms-validation';

import Button from '@/components/buttons/Button.vue';
import FormField from '@/components/forms/FormField.vue';
import InputRadio from '@/components/inputs/InputRadio.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import CountdownProgress from '@/components/other/CountdownProgress.vue';

import type { IFormConfirmation } from '@/types/forms/form-confirmation';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormConfirmation): any;
}

const { t } = useI18n();
const { statusMessage, submitStatus } = defineProps<IProps>();
const emits = defineEmits<Emits>();

const fieldConfirmBy = ref(EConfirmBy.EMAIL);

const rules = computed(() => ({
  confirm_by: {},
}));

const v$ = useVuelidate(rules, {
  confirm_by: fieldConfirmBy,
});

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
});

const isSubmitted = ref(false);

const submittedTimeout = ref<number | null>(null);
const blocked = ref(false);
const countdown = ref(0);

const submitHandler = async () => {
  if (blocked.value || isProcessing.value || v$.value.$invalid) {
    return;
  }

  emits('submit', {
    confirm_by: fieldConfirmBy.value,
  });
}

const submitLabel = computed(() => {
  if (isSubmitted.value) {
    if (countdown.value) {
      return t('form_common.resend_timer', { time: countdown.value });
    }

    return t('form_common.resend');
  }

  return t('form_common.submit');
});

const isSuccess = computed(() => {
  return submitStatus === EStatus.SUCCESS;
});

watch(() => submitStatus, (v) => {
  if (v === EStatus.SUCCESS || v === EStatus.ERROR) {
    isSubmitted.value = true;
  }
})

const endHandler = () => {
  blocked.value = false;
}

const countdownHandler = ({ seconds }: { seconds: number }) => {
  countdown.value = seconds;
}

watch(() => submitStatus, () => {
  if (submitStatus === EStatus.SUCCESS) {
    submittedTimeout.value = SMS_VALIDATION_TIMEOUT_MS;
    countdown.value = SMS_VALIDATION_TIMEOUT_MS / 1000;
    blocked.value = true;
  }
});
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormField class="confirm-by">
      <template #label>
        {{ $t('form_confirmation.confirm_by') }}
      </template>
      <div class="option-row">
        <InputRadio
          id="confirm_by_email"
          name="confirm_by"
          :value="EConfirmBy.EMAIL"
          v-model="fieldConfirmBy"
        >
          {{ $t('form_confirmation.confirm_by_email') }}
        </InputRadio>
        <InputRadio
          id="confirm_by_phone"
          name="confirm_by"
          :value="EConfirmBy.PHONE"
          v-model="fieldConfirmBy"
        >
          {{ $t('form_confirmation.confirm_by_phone') }}
        </InputRadio>
      </div>
    </FormField>
    <CountdownProgress
      v-if="isSuccess"
      class="countdown"
      :time="submittedTimeout"
      @end="endHandler"
      @progress="countdownHandler"
    />
    <div class="submit-row">
      <Button
        type="submit"
        variant="primary"
        :disabled="blocked"
        :is-processing="isProcessing"
      >
        {{ submitLabel }}
      </Button>
      <FormStatus v-if="statusMessage" :status="submitStatus" class="status">
        {{ statusMessage }}
      </FormStatus>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.confirm-by {
  --label-text-align: center;
}

.option-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.status {
  margin-top: 16px;
}

.countdown {
  margin-bottom: 24px;
}

.submit-row {
  display: flex;
  justify-content: flex-end;
}
</style>
