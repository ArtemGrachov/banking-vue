export const enum ETransactionsType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

export const enum ETransactionCategory {
  GROCERIES = 'groceries',
  RESTAURANTS_CAFES = 'restaurants_cafes',
  TRANSPORTATION = 'transportation',
  ENTERTAINMENT = 'entertainment',
  HEALTH_MEDICINE = 'health_medicine',
  SHOPPING = 'shopping',
  UTILITIES_BILLS = 'utilities_bills',
  SALARY = 'salary',
  INCOME = 'income',
}

export const TRANSACTION_CATEGORIES = [
  ETransactionCategory.GROCERIES,
  ETransactionCategory.RESTAURANTS_CAFES,
  ETransactionCategory.TRANSPORTATION,
  ETransactionCategory.ENTERTAINMENT,
  ETransactionCategory.HEALTH_MEDICINE,
  ETransactionCategory.SHOPPING,
  ETransactionCategory.UTILITIES_BILLS,
  ETransactionCategory.SALARY,
  ETransactionCategory.INCOME,
];

export const CATEGORY_COLORS = {
  [ETransactionCategory.GROCERIES]: 'yellow',
  [ETransactionCategory.RESTAURANTS_CAFES]: '#e59191',
  [ETransactionCategory.TRANSPORTATION]: 'lightblue',
  [ETransactionCategory.ENTERTAINMENT]: 'purple',
  [ETransactionCategory.HEALTH_MEDICINE]: 'red',
  [ETransactionCategory.SHOPPING]: 'orange',
  [ETransactionCategory.UTILITIES_BILLS]: 'blue',
  [ETransactionCategory.SALARY]: 'lime',
  [ETransactionCategory.INCOME]: 'green',
};
