<script setup lang="ts">
import { onMounted } from 'vue';
import { ModalsContainer } from 'vue-final-modal';

import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
const authStore = useAuthStore();

onMounted(() => {
  themeStore.init();
  authStore.init();
});
</script>

<template>
  <router-view></router-view>
  <ModalsContainer />
</template>
