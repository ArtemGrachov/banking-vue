import { defineStore } from 'pinia';

import { useCardsData } from '@/composables/data/cards-data';

export const useCardsStore = defineStore('cards', useCardsData);
