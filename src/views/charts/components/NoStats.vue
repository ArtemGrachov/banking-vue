<script setup lang="ts">
import Placeholder from '@/components/other/Placeholder.vue';

</script>

<template>
  <Placeholder>
    <template #icon>
      <span class="material-symbols-outlined">
        clock_loader_10
      </span>
    </template>
    <template #title>
      {{ $t('view_charts.no_stats.title') }}
    </template>
    <template #subtitle>
      {{ $t('view_charts.no_stats.subtitle') }}
    </template>
  </Placeholder>
</template>