import { required, helpers, minLength } from '@vuelidate/validators';

import { PASSWORD_MIN_LENGTH } from '@/constants/password-validation';

export const usePasswordValidators = () => {
  const containUpperCaseValidator = helpers.regex(/^(?=.*[A-Z]).+$/);
  const containLowerCaseValidator = helpers.regex(/^(?=.*[a-z]).+$/);
  const containNumberValidator = helpers.regex(/^(?=.*\d).+$/);
  const onlyLatinValidator = helpers.regex(/^(?:[^A-Za-z\p{L}]|[A-Za-z])*$/u);
  const specialSymbolValidator = helpers.regex(/^(?=.*[^A-Za-z0-9]).+$/);
  const minLengthValidator = minLength(PASSWORD_MIN_LENGTH);

  return {
    required,
    containUpperCase: containUpperCaseValidator,
    containLowerCase: containLowerCaseValidator,
    containNumber: containNumberValidator,
    onlyLatin: onlyLatinValidator,
    specialSymbol: specialSymbolValidator,
    minLength: minLengthValidator,
  };
}
