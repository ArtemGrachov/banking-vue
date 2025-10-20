<script setup lang="ts">
import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';

interface IProps {
  options?: any[];
  value?: any;
  trackBy?: string;
  label?: string;
  inputLabel?: string;
}

type Emits = FullScreenModalEmits & {
  (e: 'select', value: any): void;
}

const emit = defineEmits<Emits>();

const {
  options,
  value,
  trackBy,
  label,
  inputLabel,
} = defineProps<IProps>();

const checkIsActive = (opt: any) => {
  if (trackBy) {
    return opt?.[trackBy] === value;
  }

  return opt === value;
}

const getOption = (opt: any) => {
  return options?.find(o => {
    if (trackBy) {
      return o?.[trackBy] === opt?.[trackBy];
    }

    return o === opt;
  });
}

const customLabel = (opt: any) => {
  const option = getOption(opt);
  return label ? option?.[label] : option;
}

const getTrackBy = (option: any, index: number) => {
  if (trackBy) {
    return option?.[trackBy];
  }

  if (typeof option !== 'object') {
    return option;
  }

  return index;
}

const selectHandler = (option: any) => {
  let value = option;

  if (trackBy) {
    value = option?.[trackBy];
  }

  emit('select', value);
}
</script>

<template>
  <FullScreenModal @close="emit('close')">
    <template #header>
      <slot name="header" />
    </template>
    <ul class="list">
      <li
        v-for="(option, index) in options"
        :key="getTrackBy(option, index)"
        class="item"
      >
        <button
          type="button"
          class="option"
          :class="{ '_active': checkIsActive(option) }"
          @click="selectHandler(option)"
        >
          {{ customLabel(option) }}
        </button>
      </li>
    </ul>
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

  &._active {
    @include buttons.text-active();
  }
}
</style>
