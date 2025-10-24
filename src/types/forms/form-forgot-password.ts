import type { EPasswordResetBy } from '@/constants/password-reset';

export interface IFormForgotPassword {
  email?: string | null;
  phone_number?: string | null;
  reset_by?: EPasswordResetBy;
}
