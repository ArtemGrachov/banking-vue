import type { LocationQueryValue } from 'vue-router';

export const readQueryNumber = (rawQuery: string) => {
  let result = +rawQuery;

  if (isNaN(result)) {
    return null;
  }

  return result;
}

export const readQueryNumbers = (rawQuery: LocationQueryValue[] | string | string[] | undefined | null) => {
  if (typeof rawQuery === 'object' && (rawQuery as any[]).length) {
    return rawQuery!.map(q => readQueryNumber(q as any)).filter(q => q != null);
  }

  const value = readQueryNumber(rawQuery as string);

  if (value != null) {
    return [value];
  }

  return [];
}
