<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';
import Inputmask from 'inputmask';

interface IProps {
  maskOrAlias: string;
  options?: Inputmask.Options;
}

const { maskOrAlias, options } = defineProps<IProps>();

const ref = useTemplateRef('input');

const model = defineModel({
  set(v: string) {
    return Inputmask.unmask(v, { mask: maskOrAlias });
  },
});

onMounted(() => {
  const inputMask = Inputmask(maskOrAlias, options);
  inputMask.mask(ref.value!);
});
</script>

<template>
  <input
    ref="input"
    type="text"
    class="input"
    v-bind="$attrs"
    v-model="model"
  />
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/inputs.scss' as inputs;

.input {
  @include inputs.default();
}
</style>
