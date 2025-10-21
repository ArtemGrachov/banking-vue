import { nextTick } from 'vue';
import type { I18n } from 'vue-i18n';

export const loadLocaleMessages = async (i18n: I18n, locale: string) => {
  const messages = await import(`./messages/${locale}.json`)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick();
}
