export interface ICard {
  id: number;
  cardNumber: string;
  verifiation: string;
  expireDate: string;
  isBlocked?: boolean;
  currency: string;
  cardholderName: string;
  balance: number;
}
