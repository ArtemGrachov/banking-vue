import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const useShowConfirmation = () => {
  const route = useRoute();
  return computed(() => Boolean(route.query.confirmationToken || route.query.codeToken));
}
