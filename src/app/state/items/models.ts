export interface Item {
  id: string;
  product: string;
  grossAmount: number;
  netAmount: number;
  paymentMethod: string;
  transactionDate: string;
  details?: {
    cbu: string;
  }
}