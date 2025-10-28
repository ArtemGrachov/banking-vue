import { defineStore } from 'pinia';

import { useStatsData } from '@/composables/data/stats-data';

export const useStatsStore = defineStore('view-charts/stats', useStatsData);
