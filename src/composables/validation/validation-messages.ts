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

    return result;
  });

  return messages;
}
