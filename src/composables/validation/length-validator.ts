import { helpers } from '@vuelidate/validators';

export const useLengthValidator = (length: number) => {
  return helpers.withParams({ length }, (v: string) => v.length === length);
}
