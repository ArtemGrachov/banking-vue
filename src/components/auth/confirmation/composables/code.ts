import { ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormConfirmationCode } from '@/types/forms/form-confirmation-code';

interface IOptions {
  codeSubmitCallback?: (form: IFormConfirmationCode) => Promise<any>;
}

export const useCode = ({ codeSubmitCallback }: IOptions) => {
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const submitHandler = async (formValue: IFormConfirmationCode) => {
    if (!codeSubmitCallback) {
      return;
    }

    try {
      submitStatus.value = EStatus.PROCESSING;

      await codeSubmitCallback(formValue);

      statusMessage.value = null;
      submitStatus.value = EStatus.SUCCESS;
    } catch (err) {
      submitStatus.value = EStatus.ERROR;
      statusMessage.value = getErrorMessage(err);
    }
  }

  return {
    submitStatus,
    statusMessage,
    submitHandler,
  };
}
