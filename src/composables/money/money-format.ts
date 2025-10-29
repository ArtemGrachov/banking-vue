import numberFormat from 'number-format.js';

export const useMoneyFormat = () => {
  return (val: number, currencyCode: string) => numberFormat('#,###.00', val) + ' ' + currencyCode;;
}
