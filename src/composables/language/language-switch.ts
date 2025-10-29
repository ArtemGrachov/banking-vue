import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { DEFAULT_LOCALE, LOCALE_EMOJI, LOCALES } from '@/i18n/config';

import { useLoadMessages } from '@/composables/language/load-messages';
import { computed } from 'vue';

export const useLanguageSwitch = () => {
  const route = useRoute();
  const router = useRouter();
  const loadMessages = useLoadMessages();
  const { t } = useI18n();

  const switchLocale = async (locale: string) => {
    const newPath = {
      name: route.name,
      params: {
        ...route.params,
      },
      query: route.query,
      hash: route.hash,
    };

    if (locale === DEFAULT_LOCALE) {
      newPath.params.locale = '';
    } else {
      newPath.params.locale = locale;
    }

    await loadMessages(locale);

    router.push(newPath);
  }

  const localeOptions = LOCALES.map(localeCode => {
    return {
      localeCode,
      emoji: LOCALE_EMOJI[localeCode],
      label: t(`common_locales.${localeCode}`),
    };
  });

  return {
    switchLocale,
    localeOptions,
  };
}
