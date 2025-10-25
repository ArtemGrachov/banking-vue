<script setup lang="ts">
import Placeholder from '@/components/other/Placeholder.vue';

</script>

<template>
  <Placeholder>
    <template #icon>
      <span class="material-symbols-outlined">
        list
      </span>
    </template>
    <template #title>
      {{$t('common_transactions.list_placeholder.title')}}
    </template>
    <template #subtitle>
      {{$t('common_transactions.list_placeholder.subtitle')}}
    </template>
  </Placeholder>
</template>
