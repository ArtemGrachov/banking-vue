<script lang="ts" setup>
import { defineAsyncComponent, onMounted } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { useModal } from 'vue-final-modal';

import { useData } from './composable/data';
import { useCardsStore } from '@/store/cards';
import { useStatsStore } from '@/views/charts/store/stats';
import { useGetCardsData } from '@/composables/data/get-cards-data';

import Filters from './components/Filters.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';
import NoTransactions from '@/components/transactions/NoTransactions.vue';
import Button from '@/components/buttons/Button.vue';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const ModalFilters = defineAsyncComponent(() => import('./components/ModalFilters.vue'));

const statsStore = useStatsStore();
const cardsStore = useCardsStore();
const { getCardsData } = useGetCardsData();
const { init } = useData();

const getPageData = () => {
  statsStore.clear();
  cardsStore.clear();
  init();
  getCardsData();
}

const { open: openModalFilters, close: closeModalFilters } = useModal({
  component: ModalFilters,
  attrs: {
    onClose: () => closeModalFilters(),
  },
});

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <Button
      class="modal-filters-trigger"
      variant="primary"
      @click="openModalFilters"
    >
      {{ $t('view_transaction_history.mobile_trigger') }}
    </Button>
    <Filters class="desktop-filters" />
    <div v-if="statsStore.isSuccess && !statsStore.isEmpty" class="chart">
      <Pie :data="data" :options="options" />
    </div>
    <NoTransactions v-if="statsStore.isEmpty" />
    <ErrorPlaceholder v-if="statsStore.isError">
      <p>
        {{ statsStore.statusMessage }}
      </p>
    </ErrorPlaceholder>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
}

.modal-filters-trigger {
  margin-bottom: 24px;

  @include breakpoints.sm() {
    display: none;
  }
}

.desktop-filters {
  display: none;

  @include breakpoints.sm() {
    display: flex;
  }
}

.chart {
  max-width: 800px;
  margin: 0 auto;
}
</style>
