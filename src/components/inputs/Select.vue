<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useModal } from 'vue-final-modal';
import Multiselect from 'vue-multiselect';

const SelectModal = defineAsyncComponent(() => import('@/components/inputs/SelectModal.vue'));

interface IProps {
  options?: any[];
  value?: any;
  trackBy?: string;
  label?: string;
  inputLabel?: string;
  multiple?: boolean;
}

type Emits = {
  (e: 'select', selectedOption: any): void;
  (e: 'remove', removedOption: any): void;
  (e: 'blur'): void;
}

const { value, options = [], trackBy, label, inputLabel, multiple } = defineProps<IProps>();

const emit = defineEmits<Emits>();
const model = defineModel();

const selectedLabel = computed(() => {
  return customLabel(model.value);
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
    options,
    trackBy,
    label,
    multiple,
    inputLabel,
  },
});
</script>

<template>
  <button
    type="button"
    class="select _mobile"
    @click="openSelectModal"
  >
    {{ selectedLabel }}
  </button>
  <Multiselect
    v-model="model as any"
    v-bind="$attrs"
    :options="internalOptions ?? []"
    class="select _desktop"
    :custom-label="customLabel"
    :multiple="multiple"
    @select="emit('select', $event)"
    @remove="emit('remove', $event)"
    @close="emit('blur')"
  ></multiselect>
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
  }

  &._desktop {
    display: none;

    @include breakpoints.sm() {
      display: block;
    }
  }

  &._mobile {
    padding: 0 16px;

    @include breakpoints.sm() {
      display: none;
    }
  }

  :deep() {
    .multiselect__content-wrapper {
      @include dropdowns.dropdown();

      position: absolute;
      top: calc(100% + 8px);
      overflow-y: auto;
    }

    .multiselect__tags,
    .multiselect__placeholder,
    .multiselect__single {
      height: 100%;
    }

    .multiselect__placeholder,
    .multiselect__single {
      display: flex;
      align-items: center;
      padding: 0 16px;
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
