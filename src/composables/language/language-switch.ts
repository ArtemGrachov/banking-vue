import { useRoute, useRouter } from 'vue-router';

import { DEFAULT_LOCALE } from '@/i18n/config';

import { useLoadMessages } from '@/composables/language/load-messages';

export const useLanguageSwitch = () => {
  const route = useRoute();
  const router = useRouter();
  const loadMessages = useLoadMessages();

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

  return {
    switchLocale,
  };
}
