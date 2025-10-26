<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';
import { useScreens } from 'vue-screen-utils';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useModal } from 'vue-final-modal';

import { BREAKPOINTS } from '@/constants/breakpoints';

import '@vuepic/vue-datepicker/dist/main.css'
import '@/styles/libs/vue-datepicker.scss';

const DatepickerModal = defineAsyncComponent(() => import('@/components/inputs/DatepickerModal.vue'));

interface IProps {
  range?: boolean;
  multiCalendars?: boolean;
  enableTimePicker?: boolean;
  format?: string;
}

const {
  range,
  multiCalendars,
  enableTimePicker,
  format,
} = defineProps<IProps>();
const screens = useScreens({
  xsmall: `${BREAKPOINTS.xsmall}px`,
  small: `${BREAKPOINTS.small}px`,
  medium: `${BREAKPOINTS.medium}px`,
  large: `${BREAKPOINTS.large}px`,
});

type Emit = {
  (e: 'blur'): void;
  (e: 'select'): void;
}

const emit = defineEmits<Emit>();
const model = defineModel();

const modalMode = computed(() => {
  return !screens.matches.medium;
})

const { open: openDatepickerModal, close: closeDatepickerModal } = useModal({
  component: DatepickerModal,
  attrs: {
    onClose: () => closeDatepickerModal(),
    onSelect: (value) => {
      closeDatepickerModal();
      model.value = value;
      emit('select');
    },
    range,
    multiCalendars,
    enableTimePicker,
    format,
  },
});

const openHandler = () => {
  if (!modalMode.value) {
    return;
  }

  openDatepickerModal();
}
</script>

<template>
  <!-- @vue-expect-error -->
  <VueDatePicker
    v-model="model"
    :range="range"
    :multi-calendars="multiCalendars"
    :enable-time-picker="enableTimePicker"
    :format="format"
    class="datepicker"
    @blur="emit('blur')"
    @update:model-value="emit('select')"
    @open="openHandler"
  />
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.datepicker {
  :deep() {
    .dp__outer_menu_wrap {
      @media (max-width: #{map.get(breakpoints.$breakpoints, 'medium') - 1px}) {
        display: none;
      }
    }
  }
}
</style>
