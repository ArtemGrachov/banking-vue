import { useCardsStore } from '@/store/cards';

import { useGetErrorMessage } from '@/composables/common/get-error-message';
import { useToast } from '@/composables/toast/toast';

export const useGetCardsData = () => {
  const toast = useToast();
  const cardsStore = useCardsStore();
  const getErrorMessage = useGetErrorMessage();

  const getCardsData = async () => {
    if (cardsStore.isProcessing) {
      return;
    }

    try {
      await cardsStore.getCards();
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    }
  }

  return {
    getCardsData,
  };
}
