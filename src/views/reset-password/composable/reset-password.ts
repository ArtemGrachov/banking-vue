import { ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormResetPassword } from '@/types/forms/form-reset-password';

import { mockRequest } from '@/utils/mock-request';

export const useResetPassword = () => {
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const submit = async (_payload: IFormResetPassword) => {
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
