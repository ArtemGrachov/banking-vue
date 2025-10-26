<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';
import Button from '@/components/buttons/Button.vue';

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

const clearHandler = () => {
  internalValue.value = null;
  selectHandler();
}
</script>

<template>
  <FullScreenModal @close="emit('close')">
    <template #header>
      {{ inputLabel }}
    </template>
    <div class="wrap">
      <VueDatePicker
        class="datepicker"
        :inline="true"
        :range="range"
        :multi-calendars="multiCalendars"
        :enable-time-picker="enableTimePicker"
        :format="format"
        :locale="$i18n.locale"
        v-model="internalValue"
        @update:model-value="selectHandler"
      />
      <Button
        type="button"
        variant="primary"
        @click="clearHandler"
      >
        <span class="material-symbols-outlined">
          close
        </span>
        {{ $t('select_modal.clear') }}
      </Button>
    </div>
  </FullScreenModal>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/buttons.scss' as buttons;

.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
}

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
