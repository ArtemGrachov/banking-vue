import { defineStore } from 'pinia';

import { useTransactionsData } from '@/composables/data/transactions-data';

export const useTransactionsStore = defineStore('view-dashboard/transations', useTransactionsData);
