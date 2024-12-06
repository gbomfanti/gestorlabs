// src/components/modals/transactions/income/types.ts
export interface IncomeFormData {
    description: string;
    amount: string;  // Mudando de number para string para combinar com o hook
    category: string;
    date: string;
    recurrence_type: 'one_time' | 'recurring';
    recurrence_settings?: {
      frequency: 'monthly' | 'yearly';
      day_of_month?: number;
      month?: number;
      end_date?: string;
    };
  }