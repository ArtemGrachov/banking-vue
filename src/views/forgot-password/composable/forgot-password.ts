import { ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormForgotPassword } from '@/types/forms/form-forgot-password';

import { mockRequest } from '@/utils/mock-request';

export const useForgotPassword = () => {
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const submit = async (_payload: IFormForgotPassword) => {
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
