import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Validation } from '@vuelidate/core';

export const useValidationMessages = (input?: Validation<any, any> | Record<string, any>) => {
  const { t } = useI18n();

  const messages = computed(() => {
    if (!input || input.$dirty === false) {
      return [];
    }

    const result: string[] = [];

    if (input.required?.$invalid) {
      result.push(t('common_validation.required'));
    }

    if (input.minLength?.$invalid) {
      result.push(t('common_validation.min_length', { min: input.minLength.$params.min }));
    }

    if (input.email?.$invalid) {
      result.push(t('common_validation.email'));
    }

    if (input.phone?.$invalid) {
      result.push(t('common_validation.phone'));
    }

    if (input.numeric?.$invalid) {
      result.push(t('common_validation.numeric'));
    }

    if (input.length?.$invalid) {
      result.push(t('common_validation.length', { length: input.length?.$params.length }));
    }

    if (input.containLowerCase?.$invalid) {
      result.push(t('common_validation.contain_lower_case'));
    }

    if (input.containUpperCase?.$invalid) {
      result.push(t('common_validation.contain_upper_case'));
    }

    if (input.containNumber?.$invalid) {
      result.push(t('common_validation.contan_number'));
    }

    if (input.onlyLatin?.$invalid) {
      result.push(t('common_validation.only_latin'));
    }

    if (input.specialSymbol?.$invalid) {
      result.push(t('common_validation.special_symbol'));
    }

    if (input.passwordMatch?.$invalid) {
      result.push(t('common_validation.password_match'));
    }

    return result;
  });

  return messages;
}
