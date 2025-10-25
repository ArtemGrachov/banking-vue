<script setup lang="ts">
import { ETransactionCategory } from '@/constants/transactions';
import { computed } from 'vue';

interface IProps {
  category?: ETransactionCategory | null | any;
}

const { category } = defineProps<IProps>();

const iconName = computed(() => {
  switch (category) {
    case ETransactionCategory.GROCERIES: {
      return 'shopping_cart';
    }
    case ETransactionCategory.RESTAURANTS_CAFES: {
      return 'coffee';
    }
    case ETransactionCategory.TRANSPORTATION: {
      return 'directions_bus';
    }
    case ETransactionCategory.ENTERTAINMENT: {
      return 'tv';
    }
    case ETransactionCategory.HEALTH_MEDICINE: {
      return 'health_and_safety';
    }
    case ETransactionCategory.SHOPPING: {
      return 'storefront';
    }
    case ETransactionCategory.UTILITIES_BILLS: {
      return 'electrical_services';
    }
    case ETransactionCategory.SALARY: {
      return 'work';
    }
    case ETransactionCategory.INCOME: {
      return 'payment_arrow_down';
    }
    default: {
      return 'credit_card';
    }
  }
});
</script>

<template>
  <span class="transaction-category-icon material-symbols-outlined" :class="`_${category}`">
    {{ iconName }}
  </span>
</template>

<style lang="scss" scoped>
.transaction-category-icon {
  &._groceries {
    --icon-category-color: black;
    --icon-category-background: yellow;
  }

  &._restaurants_cafes {
    --icon-category-color: brown;
    --icon-category-background: #e59191;
  }

  &._transportation {
    --icon-category-color: blue;
    --icon-category-background: lightblue;
  }

  &._entertainment {
    --icon-category-color: pink;
    --icon-category-background: purple;
  }

  &._health_medicine {
    --icon-category-color: white;
    --icon-category-background: red;
  }

  &._shopping {
    --icon-category-color: black;
    --icon-category-background: orange;
  }

  &._utilities_bills {
    --icon-category-color: white;
    --icon-category-background: blue;
  }

  &._salary {
    --icon-category-color: black;
    --icon-category-background: lime;
  }

  &._income {
    --icon-category-color: yellow;
    --icon-category-background: green;
  }
}
</style>
