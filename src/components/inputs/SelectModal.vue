<script setup lang="ts">
import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';

type Emits = FullScreenModalEmits;

const emit = defineEmits<Emits>();

</script>

<template>
  <FullScreenModal @close="emit('close')">
    <template #header>
      Select modal header
    </template>
    Select modal content
  </FullScreenModal>
</template>
