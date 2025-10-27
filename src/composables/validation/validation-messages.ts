import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Validation } from '@vuelidate/core';

export const useValidationMessages = (
  input?: Validation<any, any> | Record<string, any>,
  customMessages?: Record<string, string>,
) => {
  const { t } = useI18n();

  const messages = computed(() => {
    if (!input || input.$dirty === false) {
      return [];
    }

    const result: string[] = [];

    if (input.required?.$invalid) {
      result.push(customMessages?.required ?? t('common_validation.required'));
    }

    if (input.minLength?.$invalid) {
      result.push(customMessages?.minLength ?? t('common_validation.min_length', { min: input.minLength.$params.min }));
    }

    if (input.email?.$invalid) {
      result.push(customMessages?.email ?? t('common_validation.email'));
    }

    if (input.phone?.$invalid) {
      result.push(customMessages?.phone ?? t('common_validation.phone'));
    }

    if (input.numeric?.$invalid) {
      result.push(customMessages?.numeric ?? t('common_validation.numeric'));
    }

    if (input.length?.$invalid) {
      result.push(customMessages?.length ?? t('common_validation.length', { length: input.length?.$params.length }));
    }

    if (input.containLowerCase?.$invalid) {
      result.push(customMessages?.containLowerCase ?? t('common_validation.contain_lower_case'));
    }

    if (input.containUpperCase?.$invalid) {
      result.push(customMessages?.containUpperCase ?? t('common_validation.contain_upper_case'));
    }

    if (input.containNumber?.$invalid) {
      result.push(customMessages?.containNumber ?? t('common_validation.contan_number'));
    }

    if (input.onlyLatin?.$invalid) {
      result.push(customMessages?.onlyLatin ?? t('common_validation.only_latin'));
    }

    if (input.specialSymbol?.$invalid) {
      result.push(customMessages?.specialSymbol ?? t('common_validation.special_symbol'));
    }

    if (input.passwordMatch?.$invalid) {
      result.push(customMessages?.passwordMatch ?? t('common_validation.password_match'));
    }

    if (input.max?.$invalid && customMessages?.max) {
      result.push(customMessages.max);
    }

    return result;
  });

  return messages;
}
