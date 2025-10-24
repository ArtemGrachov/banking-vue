import type { EConfirmBy } from '@/constants/confirmation';

export interface IFormForgotPassword {
  email?: string | null;
  phone_number?: string | null;
  reset_by?: EConfirmBy;
}
