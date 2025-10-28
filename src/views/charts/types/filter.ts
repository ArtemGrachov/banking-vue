export interface IFilterForm {
  cards: number[] | null;
  categories: string[] | null;
  timePeriod: [string, string] | null;
  currency: string;
}
