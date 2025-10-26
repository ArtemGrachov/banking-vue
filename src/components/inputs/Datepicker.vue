<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import '@/styles/libs/vue-datepicker.scss';

interface IProps {
  range?: boolean;
  multiCalendars?: boolean;
  enableTimePicker?: boolean;
  format?: string;
}

const {} = defineProps<IProps>();

type Emit = {
  (e: 'blur'): void;
  (e: 'select'): void;
}

const emit = defineEmits<Emit>();
const model = defineModel();
</script>

<template>
  <!-- @vue-expect-error -->
  <VueDatePicker
    v-model="model"
    :range="range"
    :multi-calendars="multiCalendars"
    :enable-time-picker="enableTimePicker"
    :format="format"
    @blur="emit('blur')"
    @update:model-value="emit('select')"
  />
</template>

