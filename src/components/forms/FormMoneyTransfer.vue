<script setup lang="ts">
import { computed, ref } from 'vue';
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';

import { CARD_MASK } from '@/validation/cards';

import Button from '@/components/buttons/Button.vue';
import BankCardSelector from '@/components/bank-cards/BankCardSelector.vue';
import NoCards from '@/components/bank-cards/NoCards.vue';
import FormField from '@/components/forms/FormField.vue';
import Input from '@/components/inputs/Input.vue';
import InputMask from '@/components/inputs/InputMask.vue';

import type { ICard } from '@/types/models/card';
import type { IFormMoneyTransfer } from '@/types/forms/form-money-transfer';

interface IProps {
  cards?: ICard[] | null;
}

type Emits = {
  (e: 'submit', formValue: IFormMoneyTransfer): any;
}

const { cards } = defineProps<IProps>();
const emit = defineEmits<Emits>();

const fieldCard = ref(null);
const fieldAmount = ref(null);
const fieldRecipient = ref(null);

const rules = computed(() => ({
  card: {
    required,
  },
  amount: {
    required,
  },
  recipient: {
    required,
  },
}));

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
      <BankCardSelector
        :cards="cards"
        v-model="fieldCard"
        @update:model-value="v$.card.$touch"
      >
        <template v-if="!cards?.length" #placeholder>
          <NoCards />
        </template>
      </BankCardSelector>
    </FormField>
    <div class="subfields">
      <FormField :input="v$.amount">
        <template #label>
          {{ $t('form_money_transfer.amount') }}
        </template>
        <Input
          type="number"
          min="0"
          v-model="fieldAmount"
          @blur="v$.amount.$touch()"
        />
      </FormField>
      <FormField :input="v$.recipient">
        <template #label>
          {{ $t('form_money_transfer.recipient') }}
        </template>
        <InputMask
          :mask-or-alias="CARD_MASK"
          v-model="fieldRecipient"
          @blur="v$.recipient.$touch()"
        />
      </FormField>
      <Button
        type="submit"
        variant="primary"
        class="submit"
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
