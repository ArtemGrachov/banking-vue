import type { LocationQueryValue } from 'vue-router';

export const readQueryNumber = (rawQuery: string) => {
  let result = +rawQuery;

  if (isNaN(result)) {
    return null;
  }

  return result;
}

export const readQueryNumbers = (rawQuery: LocationQueryValue[] | string | string[] | undefined | null) => {
  return [1];
}
