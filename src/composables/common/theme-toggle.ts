import { ETheme } from '@/constants/theme';
import { useThemeStore } from '@/store/theme'

export const useThemeToggle = () => {
  const themeStore = useThemeStore();

  const toggle = () => {
    if (themeStore.theme === ETheme.DARK) {
      themeStore.setTheme(ETheme.LIGHT);
    } else {
      themeStore.setTheme(ETheme.DARK);
    }
  }

  return {
    toggle,
  }
}
