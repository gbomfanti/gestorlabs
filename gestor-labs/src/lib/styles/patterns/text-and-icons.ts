// src/lib/styles/patterns/text-and-icons.ts
/**
 * Gestor Labs UI Patterns - Text & Icons
 * 
 * Responsabilidades:
 * - Padrões de texto
 * - Tamanhos de ícones
 * - Estilos tipográficos
 */

export const text = {
    logo: 'text-xl font-bold text-slate-800 dark:text-white truncate',
    menuItem: 'ml-3 truncate',
    title: 'text-lg font-semibold text-gray-900 dark:text-white',
    subtitle: 'text-sm text-gray-500 dark:text-gray-400',
    value: {
      base: 'text-xl sm:text-2xl font-bold text-gray-900 dark:text-white',
      success: 'text-xl sm:text-2xl font-bold text-green-500'
    },
    label: 'text-sm text-gray-600 dark:text-gray-400',
    body: 'dark:text-white',
    muted: 'text-sm text-gray-500 dark:text-gray-400',
    chartLabel: 'text-sm font-medium dark:fill-white'
} as const;
  
export const icon = {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    },
    states: {
      muted: 'text-gray-500 dark:text-gray-400',
      success: 'text-green-500',
      error: 'text-red-500'
    },
    navigation: {
      page: 'h-6 w-6 text-primary dark:text-white'
    }
} as const;