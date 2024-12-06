// src/lib/styles/patterns/types/transaction.ts

export interface TransactionPagePatterns {
  status: {
    confirmed: string;
    pending: string;
  };
  periodFilter: {
    wrapper: string;
    value: string;
    button: {
      base: string;
      active: string;
      inactive: string;
    }
  };
  chart: {
    wrapper: string;
    tooltip: {
      wrapper: string;
      text: string;
    }
  };
}