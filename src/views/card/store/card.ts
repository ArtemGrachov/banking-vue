import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { ICard } from '@/types/models/card';

export const useCardStore = defineStore('view-card/card', () => {
  const card = ref<ICard | null | undefined>();

  const setCard = (c: ICard | null | undefined) => {
    card.value = c;
  };

  const upsertCard = (c: Partial<ICard>) => {
    card.value = {
      ...card.value!,
      ...c,
    };
  }

  return {
    card,
    setCard,
    upsertCard,
  };
});
