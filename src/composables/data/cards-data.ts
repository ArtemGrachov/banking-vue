import { computed, ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { ICard } from '@/types/models/card';

import { mockRequest } from '@/utils/mock-request';

export const useCardsData = () => {
  const getStatus = ref(EStatus.INIT);
  const data = ref<ICard[] | null>(null);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const getCards = async () => {
    try {
      getStatus.value = EStatus.PROCESSING;

      const cards = await import('@/mock-data/cards.json').then(m => m.default as ICard[]);
      let response = await mockRequest<ICard[]>(cards);

      getStatus.value = EStatus.SUCCESS;
      statusMessage.value = null;
      data.value = response ?? null;

      return response;
    } catch (err) {
      statusMessage.value = getErrorMessage(err);
      getStatus.value = EStatus.ERROR;
      throw err;
    }
  }

  const clear = () => {
    getStatus.value = EStatus.INIT;
    data.value = null;
  }

  const isProcessing = computed(() => {
    return getStatus.value === EStatus.PROCESSING;
  });

  const isSuccess = computed(() => {
    return getStatus.value === EStatus.SUCCESS;
  });

  const isEmpty = computed(() => {
    return isSuccess.value && !data.value?.length;
  });

  const isError = computed(() => {
    return getStatus.value === EStatus.ERROR;
  });

  return {
    getStatus,
    data,
    isProcessing,
    isSuccess,
    isEmpty,
    isError,
    statusMessage,
    getCards,
    clear,
  };
}
