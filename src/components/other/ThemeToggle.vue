<script lang="ts" setup>
import { computed } from 'vue';

import { ETheme } from '@/constants/theme';
import { useThemeStore } from '@/store/theme';

import IconButton from '@/components/buttons/IconButton.vue';
import { useThemeToggle } from '@/composables/common/theme-toggle';

const themeStore = useThemeStore()
const { toggle } = useThemeToggle();

const iconName = computed(() => {
  if (themeStore.theme === ETheme.DARK) {
    return 'dark_mode';
  }

  return 'light_mode';
})
</script>

<template>
  <IconButton
    class="close"
    @click="toggle"
  >
    <span class="material-symbols-outlined">
      {{ iconName }}
    </span>
  </IconButton>
</template>
