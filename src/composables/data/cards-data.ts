import { ref } from 'vue';

import { EStatus } from '@/constants/status';

import type { ICard } from '@/types/models/card';

import { mockRequest } from '@/utils/mock-request';

export const useCardsData = () => {
  const getStatus = ref(EStatus.INIT);
  const data = ref<ICard[] | null>(null);

  const getCards = async () => {
    try {
      getStatus.value = EStatus.PROCESSING;

      const cards = await import('@/mock-data/cards.json').then(m => m.default as ICard[]);
      let response = await mockRequest<ICard[]>(cards);

      getStatus.value = EStatus.SUCCESS;
      data.value = response ?? null;

      return response;
    } catch (err) {
      getStatus.value = EStatus.ERROR;
      throw err;
    }
  }

  return {
    getStatus,
    data,
    getCards,
  };
}
