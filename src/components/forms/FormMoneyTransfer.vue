<script setup lang="ts">
import { computed, ref } from 'vue';
import { maxValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';
import { useI18n } from 'vue-i18n';

import { CARD_MASK } from '@/validation/cards';
import { EStatus } from '@/constants/status';

import Button from '@/components/buttons/Button.vue';
import BankCardSelector from '@/components/bank-cards/BankCardSelector.vue';
import NoCards from '@/components/bank-cards/NoCards.vue';
import FormField from '@/components/forms/FormField.vue';
import Input from '@/components/inputs/Input.vue';
import InputMask from '@/components/inputs/InputMask.vue';
import FormStatus from '@/components/forms/FormStatus.vue';

import type { ICard } from '@/types/models/card';
import type { IFormMoneyTransfer } from '@/types/forms/form-money-transfer';

interface IProps {
  cards?: ICard[] | null;
  isCardsProcessing?: boolean;
  submitStatus?: EStatus;
  statusMessage?: string | null;
}

type Emits = {
  (e: 'submit', formValue: IFormMoneyTransfer): any;
}

const { t } = useI18n();
const { cards, isCardsProcessing, submitStatus, statusMessage } = defineProps<IProps>();
const emit = defineEmits<Emits>();

const fieldCard = ref(null);
const fieldAmount = ref(null);
const fieldRecipient = ref(null);

const selectedCard = computed(() => {
  return cards?.find(c => c.id === fieldCard.value);
});

const max = computed(() => {
  return selectedCard.value?.balance;
});

const maxFormatted = computed(() => {
  return `${max.value} ${selectedCard.value?.currency}`;
});

const amountValidationMessages = computed(() => {
  return {
    max: t('form_money_transfer.max_validation', { value: maxFormatted.value }),
  };
})

const rules = computed(() => ({
  card: {
    required,
  },
  amount: {
    required,
    max: maxValue(max.value ?? 0),
  },
  recipient: {
    required,
  },
}));

const isProcessing = computed(() => {
  return submitStatus === EStatus.PROCESSING;
});

const v$ = useVuelidate(rules, {
  card: fieldCard,
  amount: fieldAmount,
  recipient: fieldRecipient,
});

const submitHandler = async () => {
  if (!(await v$.value.$validate())) {
    return;
  }

  emit('submit', {
    card: fieldCard.value,
    amount: fieldAmount.value,
    recipient: fieldRecipient.value,
  });
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <FormField :input="v$.card">
      <NoCards v-if="!isCardsProcessing && !cards?.length" />
      <BankCardSelector
        v-else
        :cards="cards"
        :is-processing="isCardsProcessing"
        :mobile-full-page="true"
        :disabled="isProcessing || isCardsProcessing"
        v-model="fieldCard"
      />
    </FormField>
    <FormStatus v-if="statusMessage" :status="submitStatus">
      {{ statusMessage }}
    </FormStatus>
    <div class="subfields">
      <FormField
        :input="v$.amount"
        :custom-validation-messages="amountValidationMessages"
      >
        <template #label>
          {{ $t('form_money_transfer.amount') }}
        </template>
        <template #default="{ classNames }">
          <Input
            type="number"
            min="0"
            :class="classNames"
            :readonly="isProcessing"
            v-model="fieldAmount"
            @blur="v$.amount.$touch()"
          />
        </template>
        <template v-if="selectedCard" #hint>
          {{ $t('form_money_transfer.max', { value: maxFormatted }) }}
        </template>
      </FormField>
      <FormField :input="v$.recipient">
        <template #label>
          {{ $t('form_money_transfer.recipient') }}
        </template>
        <template #default="{ classNames }">
          <InputMask
            :mask-or-alias="CARD_MASK"
            :class="classNames"
            :readonly="isProcessing"
            v-model="fieldRecipient"
            @blur="v$.recipient.$touch()"
          />
        </template>
      </FormField>
      <Button
        type="submit"
        variant="primary"
        class="submit"
        :is-processing="isProcessing"
      >
        {{ $t('form_money_transfer.submit') }}
      </Button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.subfields {
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
}
</style>
