export interface ICard {
  id: number;
  cardNumber: string;
  verification: string;
  expireDate: string;
  isBlocked?: boolean;
  isClosed?: boolean;
  currency: string;
  cardholderName: string;
  balance: number;
  design?: string;
}
