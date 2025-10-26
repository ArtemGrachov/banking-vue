<script setup lang="ts">
import { BREAKPOINTS } from '@/constants/breakpoints';
import { computed, defineAsyncComponent } from 'vue';
import { useModal } from 'vue-final-modal';
import { useI18n } from 'vue-i18n';
import Multiselect from 'vue-multiselect';
import { useScreens } from 'vue-screen-utils';

const SelectModal = defineAsyncComponent(() => import('@/components/inputs/SelectModal.vue'));

interface IProps {
  options?: any[];
  value?: any;
  trackBy?: string;
  label?: string;
  inputLabel?: string;
  multiple?: boolean;
  searchable?: boolean;
}

type Emits = {
  (e: 'select', selectedOption: any): void;
  (e: 'remove', removedOption: any): void;
  (e: 'blur'): void;
}

const { options = [], trackBy, label, inputLabel, multiple, searchable } = defineProps<IProps>();

const { t } = useI18n();
const emit = defineEmits<Emits>();
const model = defineModel();
const screens = useScreens({
  xsmall: `${BREAKPOINTS.xsmall}px`,
  small: `${BREAKPOINTS.small}px`,
  medium: `${BREAKPOINTS.medium}px`,
  large: `${BREAKPOINTS.large}px`,
});

const modalMode = computed(() => {
  return !screens.matches.medium;
});

const internalOptions = computed(() => {
  return options?.map(opt => trackBy ? opt[trackBy] : opt);
});

const customLabel = (opt: any) => {
  const option = options?.find(o => (trackBy ? o[trackBy] : o) === opt);
  return label ? option?.[label] : option;
}

const { open: openSelectModal, close } = useModal({
  component: SelectModal,
  attrs: {
    onClose: () => close(),
    onSelect: val => {
      model.value = val;
      close();
      emit('select', val);
    },
    value: model,
    options: computed(() => options),
    trackBy,
    label,
    multiple,
    inputLabel,
    noOptions: t('select.no_options'),
    noResult: t('select.no_result'),
  },
});

const openHandler = () => {
  if (!modalMode.value) {
    return;
  }

  openSelectModal();
}
</script>

<template>
  <Multiselect
    v-model="model as any"
    v-bind="$attrs"
    :searchable="searchable && !modalMode"
    :options="internalOptions ?? []"
    class="select"
    :custom-label="customLabel"
    :multiple="multiple"
    :placeholder="$t('select.placeholder')"
    @select="emit('select', $event)"
    @remove="emit('remove', $event)"
    @close="emit('blur')"
    @click="openHandler"
  >
    <template #noOptions>
      {{ $t('select.no_options') }}
    </template>
    <template #noResult>
      {{ $t('select.no_result') }}
    </template>
  </multiselect>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/dropdowns.scss' as dropdowns;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.select {
  position: relative;
  width: 100%;
  height: 42px;
  border: 1px solid black;
  transition: 200ms;
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.05em;
  border-radius: 4px;
  color: #2a2a2a;
  display: flex;
  align-items: center;
  background: white;
  line-height: 1;

  &.multiselect--active {
    border-color: blue;

    :deep() {
      .multiselect__tags-wrap {
        @include breakpoints.md() {
          display: none;
        }
      }
    }
  }

  :deep() {
    .multiselect__content-wrapper {
      @include dropdowns.dropdown();

      position: absolute;
      top: calc(100% + 8px);
      overflow-y: auto;

      display: none;

      @include breakpoints.md() {
        display: block;
      }
    }

    .multiselect__tags,
    .multiselect__placeholder,
    .multiselect__single {
      height: 100%;
    }

    .multiselect__tags-wrap {
      pointer-events: none;
      min-width: 0;
      overflow: hidden;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 8px;
    }

    .multiselect__placeholder,
    .multiselect__single {
      display: flex;
      align-items: center;
      padding: 0 16px;
    }

    .multiselect__tag {
      white-space: nowrap;
      padding: 4px 8px;
      background: darkred;
      color: white;
      border-radius: 16px;
    }

    .multiselect__input {
      height: 100%;
      padding: 0 16px;
      font-size: 14px;
      font-family: 'Raleway', sans-serif;
      letter-spacing: 0.05em;
      border: none;
      background: none;

      &:focus {
        outline: none;
      }
    }

    .multiselect__content {
      @include dropdowns.option-list();
    }

    .multiselect__option {
      @include dropdowns.option();
    }

    .multiselect-enter-active,
    .multiselect-leave-active {
      @include dropdowns.dropdown-open();
    }

    .multiselect-enter-from,
    .multiselect-leave-to {
      @include dropdowns.dropdown-closed();
    }
  }
}
</style>
