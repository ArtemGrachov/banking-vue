import { ref } from 'vue';
import { defineStore } from 'pinia';

import { ETheme, THEME_STORE_KEY } from '@/constants/theme';

import { useStorage } from '@/composables/storage/storage';

export const useThemeStore = defineStore('theme', () => {
  const { getItem, setItem } = useStorage();

  const getInitialValue = () => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let theme = getItem(THEME_STORE_KEY);

    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)')) {
        theme = ETheme.DARK;
      } else if (window.matchMedia('(prefers-color-scheme: light)')) {
        theme = ETheme.LIGHT;
      }
    }

    return theme;
  }

  const theme = ref<ETheme | null>(getInitialValue());

  const setTheme = (value: ETheme) => {
    setItem(THEME_STORE_KEY, value);
    document.documentElement.setAttribute('data-theme', value);
    theme.value = value;
  }

  const init = () => {
    let theme;

    try {
      theme = localStorage.getItem('theme') as ETheme;
    } catch (err) {
      console.log(err);
    }

    if (theme) {
      setTheme(theme);
    }
  }

  return {
    theme,
    setTheme,
    init,
  };
});
