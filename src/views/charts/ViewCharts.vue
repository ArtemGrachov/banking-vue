<script lang="ts" setup>
import { useStatsData } from '@/composables/data/stats-data';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { onMounted } from 'vue';
import { Pie } from 'vue-chartjs';

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

const { getStats } = useStatsData();

onMounted(() => {
  getStats({ currency: 'USD' }).then(r => {
    console.log(r);
  });
});
</script>

<template>
  <div class="page">
    <div class="chart">
      <Pie :data="data" :options="options" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
}

.chart {
  max-width: 800px;
  margin: 0 auto;
}
</style>
