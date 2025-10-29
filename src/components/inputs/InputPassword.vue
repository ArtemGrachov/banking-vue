<script lang="ts" setup>
import { ref, type InputHTMLAttributes } from 'vue';

import IconButton from '@/components/buttons/IconButton.vue';

const model = defineModel();

interface IProps {
  id?: string;
  readonly?: boolean;
  inputAttrs?: InputHTMLAttributes;
}

type Emits = {
  (e: 'blur', payload: FocusEvent): void;
  (e: 'focus', payload: FocusEvent): void;
}

defineProps<IProps>();
const emit = defineEmits<Emits>();

const visibility = ref(false);
</script>

<template>
  <div class="input-password">
    <input
      :type="visibility ? 'text' : 'password'"
      :readonly="readonly"
      class="input"
      v-model="model"
      v-bind="inputAttrs"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <IconButton
      :id="id"
      type="button"
      class="visibility-toggle"
      @click="visibility = !visibility"
    >
      <span class="material-symbols-outlined">
        {{ visibility ? 'visibility_off' : 'visibility' }}
      </span>
    </IconButton>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/inputs.scss' as inputs;

.input-password {
  position: relative;
}

.input {
  @include inputs.default();

  padding-right: 42px;
}

.visibility-toggle {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
