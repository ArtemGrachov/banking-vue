import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { IFormOrderCard } from '@/types/forms/form-order-card';

import { mockRequest } from '@/utils/mock-request';

export const useOrderCard = () => {
  const { t } = useI18n();
  const submitStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const submit = async (_payload: IFormOrderCard) => {
    try {
      statusMessage.value = null;
      submitStatus.value = EStatus.PROCESSING;

      await mockRequest<undefined>();

      statusMessage.value = t('view_order_card.success');
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
