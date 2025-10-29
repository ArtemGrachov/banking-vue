import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/store/auth'
import { ROUTE_NAMES } from '@/router/routes';

import { useConfirmationModal } from '@/composables/modals/confirmation-modal';

export const useLogout = () => {
  const { t } = useI18n();
  const router = useRouter();

  const authStore = useAuthStore();
  const confirmationModal = useConfirmationModal(computed(() => t('common_auth.logout_question')));

  const logout = async () => {
    const confirmation = await confirmationModal();

    if (!confirmation) {
      return false;
    }

    authStore.unauthorize();
    router.push({ name: ROUTE_NAMES.LOGIN });

    return true;
  }

  return {
    logout,
  };
}
