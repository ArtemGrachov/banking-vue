import { ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useAuthStore } from '@/store/auth';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormLogin } from '@/types/forms/form-login';

import { mockRequest } from '@/utils/mock-request';

export const useLogin = () => {
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();
  const { authorize } = useAuthStore();

  const submit = async (_payload: IFormLogin) => {
    try {
      submitStatus.value = EStatus.PROCESSING;
      await mockRequest<undefined>();
      authorize('ABCDEFGHIJK')
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
