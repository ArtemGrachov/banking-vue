<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef } from 'vue';

import FullScreenModal, { type Emits as FullScreenModalEmits } from '@/components/modals/FullScreenModal.vue';
import Placeholder from '@/components/other/Placeholder.vue';
import Button from '@/components/buttons/Button.vue';

interface IProps {
  options?: ComputedRef<any[]>;
  value?: any | any[];
  trackBy?: string;
  label?: string;
  inputLabel?: string;
  multiple?: boolean;
  noOptions?: string;
  noResult?: string;
}

type Emits = FullScreenModalEmits & {
  (e: 'select', value: any): void;
}

const emit = defineEmits<Emits>();

const {
  options: propOptions,
  value,
  trackBy,
  label,
  inputLabel,
  multiple,
  noOptions,
  noResult,
} = defineProps<IProps>();

const internalValue = ref<any | any[] | null | undefined>(null);

const options = computed(() => {
  return propOptions as unknown as any[];
});

const isNoOptions = computed(() => {
  return !options?.value?.length
});

const checkIsActiveSingle = (opt: any, val: any) => {
  if (trackBy) {
    return opt?.[trackBy] === val;
  }

  return opt === val;
}

const checkIsActive = (opt: any) => {
  if (multiple) {
    return (internalValue.value as any[])?.some(val => checkIsActiveSingle(opt, val));
  }

  return checkIsActiveSingle(opt, internalValue.value);
}

const getOption = (opt: any) => {
  return (options?.value as any[])?.find(o => {
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
  let newValue = option;

  if (trackBy) {
    newValue = option?.[trackBy];
  }

  if (multiple) {
    const currentValue = (internalValue.value ?? []) as any[];

    if (currentValue.includes(newValue)) {
      internalValue.value =  currentValue.filter(v => v !== newValue);
    } else {
      internalValue.value =  [...currentValue, newValue];
    }
  } else {
    internalValue.value = newValue;
    emitSelect();
  }
}

const emitSelect = () => {
  emit('select', internalValue.value);
  emit('close');
}

const closeHandler = () => {
  if (internalValue.value !== value) {
    emit('select', internalValue.value);
  }

  emit('close');
}

const clearHandler = () => {
  if (multiple) {
    internalValue.value = [];
  } else {
    internalValue.value = null;
  }
}

onMounted(() => {
  internalValue.value = value;
});
</script>

<template>
  <FullScreenModal @close="closeHandler">
    <template #header>
      {{ inputLabel }}
    </template>
    <Placeholder v-if="isNoOptions">
      <template #icon>
        <span class="material-symbols-outlined">
          list
        </span>
      </template>
      <template #title>
        {{ noOptions || $t('select.no_options') }}
      </template>
    </Placeholder>
    <div class="wrap">
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
</style>
