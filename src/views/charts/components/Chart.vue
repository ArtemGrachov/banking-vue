<script lang="ts" setup>
import { computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { useI18n } from 'vue-i18n';

import { CATEGORY_COLORS, type ETransactionCategory } from '@/constants/transactions';

import type { IStats } from '@/types/api/stats';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  stats: IStats;
}

const { stats } = defineProps<IProps>();

const { t } = useI18n();

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: { bottom: 24 },
  },
  plugins: {
    legend: {
      position: 'bottom',
      align: 'center',
      labels: {
        boxWidth: 14,
        padding: 12,
        font: {
          size: 14,
          family: "'Raleway', sans-serif",
        },
      },
    },
  },
};


const chartData = computed(() => {
  const categories = Object.keys(stats.categories);
  const labels = categories.map(category => t(`common_transactions.categories.${category}`));

  return {
    labels,
    datasets: [
      {
        backgroundColor: categories.map(category => CATEGORY_COLORS[category as ETransactionCategory]),
        data: categories.map(category => stats.categories[category as ETransactionCategory]),
      },
    ],
  }
});

</script>

<template>
  <div>
    <!-- @vue-expect-error -->
    <Pie :data="chartData" :options="options" />
  </div>
</template>