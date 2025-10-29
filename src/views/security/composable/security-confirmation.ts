import type { IFormConfirmation } from '@/types/forms/form-confirmation';

import { mockRequest } from '@/utils/mock-request';

export const useSecurityConfirmation = () => {
  const submit = async (_payload: IFormConfirmation) => {
    await mockRequest<undefined>();
  }

  return {
    submit,
  };
}
