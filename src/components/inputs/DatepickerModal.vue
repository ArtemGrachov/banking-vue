<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';

interface IProps {
  inputLabel?: string;
  range?: boolean;
  multiCalendars?: boolean;
  enableTimePicker?: boolean;
  format?: string;
}

type Emits = FullScreenModalEmits & {
  (e: 'select', value: any): void;
}

const emit = defineEmits<Emits>();

const internalValue = ref(null);

const {
  inputLabel,
  range,
  multiCalendars,
  enableTimePicker,
  format,
} = defineProps<IProps>();

const selectHandler = () => {
  emit('close');
  emit('select', internalValue.value);
}
</script>

<template>
  <FullScreenModal @close="emit('close')">
    <template #header>
      {{ inputLabel }}
    </template>
    <VueDatePicker
      class="datepicker"
      :inline="true"
      :range="range"
      :multi-calendars="multiCalendars"
      :enable-time-picker="enableTimePicker"
      :format="format"
      v-model="internalValue"
      @update:model-value="selectHandler"
    />
  </FullScreenModal>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/buttons.scss' as buttons;

.list {
  list-style: none;
  padding: 0;
  margin: 0 var(--content-padding-negative);
}

.option {
  @include buttons.text();

  padding: var(--content-padding);
  width: 100%;
  font-size: 16px;
  text-align: left;

  &._active {
    @include buttons.text-active();
  }
}

.datepicker {
  --dp-menu-padding: 0;
  --dp-border-radius: 0;
  justify-content: center;

  :deep() {
    .dp__menu {
      border: none !important;
    }
  }
}
</style>
