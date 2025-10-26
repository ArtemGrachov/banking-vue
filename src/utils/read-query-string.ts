import type { LocationQueryValue } from 'vue-router';

export const readQueryStrings = (rawQuery: LocationQueryValue[] | string | string[] | undefined | null) => {
  if (typeof rawQuery === 'object' && (rawQuery as any[]).length) {
    return (rawQuery as string[]).filter(s => s != null);
  }

  if (rawQuery != null) {
    return [rawQuery as string];
  }

  return [];
}
