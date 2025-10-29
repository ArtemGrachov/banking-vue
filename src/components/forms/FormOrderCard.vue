<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators'

import { CARD_DESIGNS, ECardDesign } from '@/constants/cards';
import { EStatus } from '@/constants/status';

import FormStatus from '@/components/forms/FormStatus.vue';
import FormField from '@/components/forms/FormField.vue';
import Select from '@/components/inputs/Select.vue';
import Button from '@/components/buttons/Button.vue';

import type { IFormOrderCard } from '@/types/forms/form-order-card';

interface IProps {
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormOrderCard): any;
  (e: 'design-select', design: ECardDesign): any;
}

const { t } = useI18n();

const { submitStatus, statusMessage } = defineProps<IProps>();
const emit = defineEmits<Emits>();

const fieldDesign = ref(ECardDesign.RED);

const designOptions = computed(() => {
  return CARD_DESIGNS.map(design => ({
    value: design,
    label: t(`common_cards.design.${design}`),
  }));
});

const rules = computed(() => ({
  design: {
    required,
  },
}));

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
});

const v$ = useVuelidate(rules, {
  design: fieldDesign,
});

const submitHandler = async () => {
  if (!(await v$.value.$validate())) {
    return;
  }

  emit('submit', {
    design: fieldDesign.value,
  });
}

const handleDesignSelect = () => {
  emit('design-select', fieldDesign.value);
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormField :input="v$.design">
      <template #label>
        {{ $t('form_order_card.design') }}
      </template>
      <Select
        :options="designOptions"
        track-by="value"
        label="label"
        :allow-empty="false"
        :readonly="isProcessing"
        v-model="fieldDesign"
        @update:model-value="handleDesignSelect"
      />
    </FormField>
    <div class="submit-row">
      <Button
        type="submit"
        variant="primary"
        :is-processing="isProcessing"
      >
        {{ $t('form_order_card.submit') }}
      </Button>
    </div>
    <FormStatus
      v-if="statusMessage"
      :status="submitStatus"
      class="status"
    >
      {{ statusMessage }}
    </FormStatus>
  </form>
</template>

<style lang="scss" scoped>
.status {
  margin-top: 24px;
}

.submit-row {
  display: flex;
  justify-content: flex-end;
}
</style>
