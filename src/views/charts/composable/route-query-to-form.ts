import dayjs from 'dayjs';
import { type LocationQuery } from 'vue-router';

import { readQueryNumbers } from '@/utils/read-query-number';
import { readQueryStrings } from '@/utils/read-query-string';

import type { IFilterForm } from '../types/filter';

export const useRouteQueryToForm = () => {
  const routeQueryToForm = (query: LocationQuery) => {
    let timePeriod = null;

    const {
      cards,
      categories,
      time_period_from,
      time_period_to,
      currency,
    } = query;

    if (time_period_from && time_period_from) {
      const dayjsFrom = dayjs(time_period_from as string);
      const dayjsTo = dayjs(time_period_to as string);
      const isValid = dayjsFrom.isValid() && dayjsTo.isValid();

      if (isValid) {
        timePeriod = [
          dayjsFrom.toJSON(),
          dayjsTo.toJSON(),
        ] as [string, string];
      }
    }

    const formValue: IFilterForm = {
      cards: readQueryNumbers(cards),
      categories: readQueryStrings(categories),
      timePeriod,
      currency: (currency as string) ?? 'USD',
    };

    return formValue;
  }

  return routeQueryToForm;
}
