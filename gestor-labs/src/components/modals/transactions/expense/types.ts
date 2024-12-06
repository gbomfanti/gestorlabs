/**
 * Tipos para o Modal de Despesas
 * 
 * Define as interfaces e tipos necessários para o modal de cadastro
 * de despesas, incluindo props do componente e estruturas de dados.
 */

import { Category } from '@/components/modals/categories/types';

export type RecurrenceType = 'one_time' | 'recurring';
export type FrequencyType = 'monthly' | 'yearly';

export interface RecurrenceSettings {
  frequency: FrequencyType;
  day_of_month?: number;
  month?: number;
  end_date?: string;
}

export interface ExpenseFormData {
  description: string;
  amount: string;
  category: string;
  date: string;
  recurrence_type: RecurrenceType;
  recurrence_settings?: RecurrenceSettings;
}

export interface CreateExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  categories: Category[];
}