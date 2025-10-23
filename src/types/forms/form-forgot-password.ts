export interface IFormForgotPassword {
  email?: string | null;
  phone_number?: string | null;
  reset_by?: 'phone' | 'email';
}
