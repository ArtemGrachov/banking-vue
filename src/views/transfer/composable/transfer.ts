import { ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormMoneyTransfer } from '@/types/forms/form-money-transfer';

import { mockRequest } from '@/utils/mock-request';

export const useTransfer = () => {
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const submit = async (_payload: IFormMoneyTransfer) => {
    try {
      submitStatus.value = EStatus.PROCESSING;
      await mockRequest<undefined>();
      statusMessage.value = null;
      submitStatus.value = EStatus.SUCCESS;
    } catch (err) {
      submitStatus.value = EStatus.ERROR;
      statusMessage.value = getErrorMessage(err);
      throw err;
    }
  }

  return {
    submitStatus,
    statusMessage,
    submit,
  };
}
