import dayjs from 'dayjs';

import type { IFilterForm } from '../types/filter';

const DATETIME_QUERY_FORMAT = 'YYYY-MM-DD';

export const useFormToRouteQuery = () => {
  const formToRouteQuery = (formValue: Partial<IFilterForm>) => {
    const {
      cards,
      categories,
      timePeriod,
      currency,
    } = formValue;

    const query: Record<string, string | string[]> = {};

    if (cards?.length) {
      query.cards = cards.map(id => id.toString());
    }

    if (categories?.length) {
      query.categories = categories;
    }

    const periodFrom = timePeriod?.[0];
    const periodTo = timePeriod?.[1];

    if (periodFrom && periodTo) {
      const dayjsFrom = dayjs(periodFrom);
      const dayjsTo = dayjs(periodTo);

      query.time_period_from = dayjsFrom.format(DATETIME_QUERY_FORMAT);
      query.time_period_to = dayjsTo.format(DATETIME_QUERY_FORMAT);
    }

    if (currency) {
      query.currency = currency;
    }

    return query;
  }

  return formToRouteQuery;
}
