import { useI18n } from 'vue-i18n';

export const useLoadMessages = () => {
  const i18n = useI18n();

  return async (locale: string) => {
    if (i18n.availableLocales.includes(locale)) {
      return;
    }

    const messages = await import(`@/i18n/messages/${locale}.json`);

    i18n.setLocaleMessage(locale, messages);
  }
}
