import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { EStatus } from '@/constants/status';
import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';
import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormConfirmationCode } from '@/types/forms/form-confirmation-code';

import { mockRequest } from '@/utils/mock-request';

export const useForgotPasswordCode = () => {
  const router = useRouter()
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();
  const getRoute = useGetRoute();

  const submit = async (_payload: IFormConfirmationCode) => {
    try {
      submitStatus.value = EStatus.PROCESSING;
      await mockRequest<undefined>();
      statusMessage.value = null;
      submitStatus.value = EStatus.SUCCESS;
      router.push(getRoute({ name: ROUTE_NAMES.RESET_PASSWORD }));
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
