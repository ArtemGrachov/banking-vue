<script setup lang="ts">
import Placeholder from '@/components/other/Placeholder.vue';

</script>

<template>
  <Placeholder>
    <template #icon>
      <span class="material-symbols-outlined">
        credit_card
      </span>
    </template>
    <template #title>
      {{$t('common_cards.list_placeholder.title')}}
    </template>
    <template #subtitle>
      {{$t('common_cards.list_placeholder.subtitle')}}
    </template>
  </Placeholder>
</template>
