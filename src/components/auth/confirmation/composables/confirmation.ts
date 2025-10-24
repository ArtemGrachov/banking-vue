import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { EStatus } from '@/constants/status';
import { EConfirmBy } from '@/constants/confirmation';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormConfirmation } from '@/types/forms/form-confirmation';

interface IOptions {
  confirmationSubmitCallback?: (form: IFormConfirmation) => Promise<any>;
}

export const useConfirmation = ({ confirmationSubmitCallback }: IOptions) => {
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();
  const router = useRouter();
  const confirmBy = ref<EConfirmBy | null | undefined>(null);

  const submitHandler = async (formValue: IFormConfirmation) => {
    if (!confirmationSubmitCallback) {
      return;
    }

    try {
      submitStatus.value = EStatus.PROCESSING;

      await confirmationSubmitCallback(formValue);

      statusMessage.value = null;
      confirmBy.value = formValue.confirm_by;
      submitStatus.value = EStatus.SUCCESS;
      router.push({ query: { codeToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' } });
    } catch (err) {
      submitStatus.value = EStatus.ERROR;
      statusMessage.value = getErrorMessage(err);
    }
  }

  return {
    submitStatus,
    statusMessage,
    confirmBy,
    submitHandler,
  };
}
