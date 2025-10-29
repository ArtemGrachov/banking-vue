import { ref } from 'vue';
import { defineStore } from 'pinia';

import { AUTH_TOKEN_STORE_KEY } from '@/constants/auth';

import { useStorage } from '@/composables/storage/storage';

export const useAuthStore = defineStore('auth', () => {
  const { setItem, getItem, removeItem } = useStorage();
  const isAuthorized = ref(false);

  const authorize = (token: string) => {
    setItem(AUTH_TOKEN_STORE_KEY, token);
    isAuthorized.value = true;
  }

  const unauthorize = () => {
    removeItem(AUTH_TOKEN_STORE_KEY);
    isAuthorized.value = false;
  }

  const init = () => {
    const authToken = getItem(AUTH_TOKEN_STORE_KEY);

    if (authToken) {
      authorize(authToken);
    }
  }

  return {
    isAuthorized,
    init,
    authorize,
    unauthorize,
  };
});
