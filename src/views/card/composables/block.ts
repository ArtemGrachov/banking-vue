import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { EStatus } from '@/constants/status';

import { useCardStore } from '../store/card';

import { useToast } from '@/composables/toast/toast';
import { useConfirmationModal } from '@/composables/modals/confirmation-modal';
import { useGetErrorMessage } from '@/composables/common/get-error-message';

import { mockRequest } from '@/utils/mock-request';

export const useBlock = () => {
  const { t } = useI18n();
  const getErrorMessage = useGetErrorMessage();
  const toast = useToast();

  const cardStore = useCardStore();
  const card = computed(() => cardStore.card);
  const blockConfrimationModal = useConfirmationModal(computed(() => {
    if (card.value?.isBlocked) {
      return t('common_cards.block.question_unblock', { cardNumber: card.value?.cardNumber });
    }

    return t('common_cards.block.question_block', { cardNumber: card.value?.cardNumber });
  }));
  const blockStatus = ref(EStatus.INIT);
  const statusMessage = ref<string | null>(null);
  const isProcessing = computed(() => {
    return blockStatus.value === EStatus.PROCESSING;
  });

  const block = async () => {
    const confirm = await blockConfrimationModal();

    if (!confirm) {
      return;
    }

    try {
      const newIsBlocked = !card.value?.isBlocked;

      blockStatus.value = EStatus.PROCESSING;
      await mockRequest<undefined>();
      cardStore.upsertCard({ isBlocked: newIsBlocked })
      statusMessage.value = null;
      blockStatus.value = EStatus.SUCCESS;

      if (newIsBlocked) {
        toast.success(t('common_cards.block.block_success'));
      } else {
        toast.success(t('common_cards.block.unblock_success'));
      }
    } catch (err) {
      blockStatus.value = EStatus.ERROR;
      statusMessage.value = getErrorMessage(err);
      toast.error(statusMessage.value!);
      throw err;
    }
  }

  return {
    blockStatus,
    statusMessage,
    isProcessing,
    block,
  };
}