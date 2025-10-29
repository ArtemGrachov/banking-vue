import type { IFormConfirmationCode } from '@/types/forms/form-confirmation-code';

import { mockRequest } from '@/utils/mock-request';

export const useSecurityCode = (onSuccess?: Function) => {
  const submit = async (_payload: IFormConfirmationCode) => {
    const result = await mockRequest<undefined>();
    onSuccess && onSuccess();
  }

  return {
    submit,
  };
}
