export interface IFilterForm {
  cards: number[] | null;
  categories: string[] | null;
  timePeriod: [string, string] | null;
  page: number;
}
