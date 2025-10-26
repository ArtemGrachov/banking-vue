<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import '@/styles/libs/vue-datepicker.scss';

const model = defineModel();
</script>

<template>
  <!-- @vue-expect-error -->
  <VueDatePicker v-model="model" range multi-calendars />
</template>

