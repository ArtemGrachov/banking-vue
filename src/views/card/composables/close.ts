import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { EStatus } from '@/constants/status';

import { useCardStore } from '../store/card';

import { useToast } from '@/composables/toast/toast';
import { useConfirmationModal } from '@/composables/modals/confirmation-modal';
import { useGetErrorMessage } from '@/composables/common/get-error-message';

import { mockRequest } from '@/utils/mock-request';

export const useClose = () => {
  const { t } = useI18n();
  const getErrorMessage = useGetErrorMessage();
  const toast = useToast();

  const cardStore = useCardStore();
  const card = computed(() => cardStore.card);
  const closeConfrimationModal = useConfirmationModal(
    computed(() => t('common_cards.close.question', { cardNumber: card.value?.cardNumber })),
  );
  const closeStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const isProcessing = computed(() => {
    return closeStatus.value === EStatus.PROCESSING;
  });

  const close = async () => {
    const confirm = await closeConfrimationModal();

    if (!confirm) {
      return;
    }

    try {
      closeStatus.value = EStatus.PROCESSING;
      await mockRequest<undefined>();
      cardStore.upsertCard({ isClosed: true });
      statusMessage.value = null;
      closeStatus.value = EStatus.SUCCESS;

      toast.success(t('common_cards.close.success'));
    } catch (err) {
      closeStatus.value = EStatus.ERROR;
      statusMessage.value = getErrorMessage(err);
      toast.error(statusMessage.value!);
      throw err;
    }
  }

  return {
    closeStatus,
    statusMessage,
    isProcessing,
    close,
  };
}
