import { useRouter } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';

import type { IFormConfirmationCode } from '@/types/forms/form-confirmation-code';

import { mockRequest } from '@/utils/mock-request';

export const useRegistrationCode = () => {
  const router = useRouter();
  const getRoute = useGetRoute();

  const submit = async (_payload: IFormConfirmationCode) => {
    const result = await mockRequest<undefined>();
    router.push(getRoute({ name: ROUTE_NAMES.DASHBOARD }));
    return result;
  }

  return {
    submit,
  };
}
