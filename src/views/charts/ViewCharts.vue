<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted } from 'vue';
import { useModal } from 'vue-final-modal';

import { useData } from './composable/data';
import { useCardsStore } from '@/store/cards';
import { useStatsStore } from '@/views/charts/store/stats';
import { useGetCardsData } from '@/composables/data/get-cards-data';

import Filters from './components/Filters.vue';
import Chart from './components/Chart.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';
import NoStats from '@/views/charts/components/NoStats.vue';
import Placeholder from '@/components/other/Placeholder.vue';
import Button from '@/components/buttons/Button.vue';

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
    <div class="container">
      <Button
        class="modal-filters-trigger"
        variant="primary"
        @click="openModalFilters"
      >
        {{ $t('view_transaction_history.mobile_trigger') }}
      </Button>
      <Filters class="desktop-filters" />
      <div v-if="statsStore.isSuccess && !statsStore.isEmpty" class="chart-row">
        <div class="col">
          <h2 class="chart-title">
            {{ $t('view_charts.title_expense') }}
          </h2>
          <div class="chart">
            <Chart :stats="statsStore.data!.outcome" />
          </div>
        </div>
        <div class="col">
          <h2 class="chart-title">
            {{ $t('view_charts.title_income') }}
          </h2>
          <div class="chart">
            <Chart :stats="statsStore.data!.income" />
          </div>
        </div>
      </div>
      <NoStats v-if="statsStore.isEmpty" class="placeholder" />
      <ErrorPlaceholder v-if="statsStore.isError" class="placeholder">
        <p>
          {{ statsStore.statusMessage }}
        </p>
      </ErrorPlaceholder>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
  @include layout.page-default();
}

.container {
  @include layout.container();
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
    margin-bottom: 24px;
  }
}

.placeholder,
.chart-row {
  min-height: 500px;
}

.chart-row {
  max-width: 800px;
  margin: 0 auto;
  min-height: 500px;
  margin-bottom: 64px;

  @include breakpoints.sm() {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

.col {
  flex: 1 1 0;
}

.chart-title {
  text-align: center;
}

.chart {
  max-width: 100%;
}
</style>
