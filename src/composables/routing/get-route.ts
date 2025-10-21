import { useI18n } from 'vue-i18n';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const useGetRoute = () => {
  const { locale } = useI18n();

  return ({ name, params, query, hash }: { name: string, params?: any, query?: any, hash?: any }) => {
    const outputParams = params ? { ...params } : {};

    if (locale.value === DEFAULT_LOCALE) {
      delete outputParams.locale;
    } else {
      outputParams.locale = locale.value;
    }

    return {
      name,
      params,
      query,
      hash,
    };
  }
}
