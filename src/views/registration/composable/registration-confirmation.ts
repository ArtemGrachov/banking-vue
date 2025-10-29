import type { IFormConfirmation } from '@/types/forms/form-confirmation';

import { mockRequest } from '@/utils/mock-request';

export const useRegistrationConfirmation = () => {
  const submit = async (_payload: IFormConfirmation) => {
    return await mockRequest<undefined>();
  }

  return {
    submit,
  };
}
