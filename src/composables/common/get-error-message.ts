import { useI18n } from 'vue-i18n';

export const useGetErrorMessage = () => {
  const { t } = useI18n();

  return (error: any) => {
    if (typeof error === 'string') {
      return error;
    }

    return error?.message ?? t('common_errors.generic');
  }
}