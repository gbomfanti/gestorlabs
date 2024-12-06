// src/lib/styles/patterns/pages/transaction.ts

import { components } from '../components';
import { layout } from '../layout';

export const transaction = {
  // Status específicos de transações financeiras
  status: {
    confirmed: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    pending: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
  },

  // Estrutura específica do filtro de períodos do gráfico
  periodFilter: {
    wrapper: 'flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0',
    value: 'text-sm text-muted-foreground whitespace-nowrap',
    button: {
      base: 'min-w-[70px] text-sm px-3 py-1.5 rounded-lg transition-colors',
      active: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700',
      inactive: 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
    }
  },

  // Estrutura específica do gráfico de transações
  chart: {
    wrapper: 'min-w-[600px] h-[300px] py-4',
    tooltip: {
      wrapper: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2',
      text: 'text-sm text-gray-600 dark:text-gray-300'
    }
  }
} as const;