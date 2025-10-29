<script setup lang="ts">
import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';
import Filters from './Filters.vue';

type Emits = FullScreenModalEmits;
const emit = defineEmits<Emits>();

</script>

<template>
  <FullScreenModal @close="emit('close')">
    <template #header>
      {{ $t('view_charts.modal_filters.title') }}
    </template>
    <div class="view">
      <Filters @select="emit('close')" />
    </div>
  </FullScreenModal>
</template>
