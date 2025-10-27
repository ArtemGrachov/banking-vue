import { useRoute } from 'vue-router';

import { useCardStore } from '../store/card';
import { useCardsStore } from '@/store/cards';

import { useGetCardsData } from '@/composables/data/get-cards-data';

export const useCard = () => {
  const route = useRoute();
  const cardsStore = useCardsStore();
  const cardStore = useCardStore();
  const { getCardsData } = useGetCardsData();

  const getPageData = async () => {
    cardStore.setCard(null);
    cardsStore.clear();

    await getCardsData();

    const rawId = route.params.id!;
    const card = cardsStore.data?.find(c => c.id === +rawId);

    cardStore.setCard(card);
  }

  return {
    getPageData,
  };
}
