// src/lib/styles/patterns/components.ts

export const components = {
  card: {
    base: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
    padded: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4',
    stats: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 hover:border-primary/50 dark:hover:border-primary/50',
    interactive: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 hover:shadow-lg transition-all duration-200',
    title: 'text-lg font-semibold text-gray-900 dark:text-white mb-4',
    subtitle: 'text-sm font-medium text-gray-600 dark:text-gray-400 mb-2',
    titleWithIcon: 'text-lg font-bold text-gray-900 dark:text-white',
  },

  button: {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors',
    secondary: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors',
    icon: 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
    danger: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors',
    disabled: 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg',
    period: 'text-sm px-3 py-1.5 rounded-lg transition-colors',
  },

  iconButton: {
    base: 'p-2 rounded-lg transition-colors',
    ghost: 'p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-800 flex-shrink-0',
    primary: 'p-2 rounded-lg bg-primary hover:bg-primary/90 text-white',
    secondary: 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700',
  },

  /*table: {
    container: 'w-full overflow-x-auto -mx-4 md:mx-0',
    wrapper: 'min-w-full md:w-full inline-block align-middle',
    base: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
    header: 'bg-gray-50 dark:bg-gray-900',
    headerCell: 'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
    row: 'hover:bg-gray-50 dark:hover:bg-gray-700/50',
    cell: 'px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap',
    actions: {
      wrapper: 'flex justify-end gap-2',
      edit: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
      delete: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
    }
  },*/

  table: {
    container: 'w-full overflow-x-auto',
    wrapper: 'min-w-full inline-block align-middle',
    base: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
    header: 'bg-white dark:bg-gray-800',
    headerCell: 'px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
    row: 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700',
    cell: 'px-6 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap',
    actions: {
      wrapper: 'flex justify-end items-center gap-2',
      edit: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
      delete: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
    }
  },

  form: {
    group: 'space-y-2',
    label: 'block text-sm font-medium text-gray-700 dark:text-gray-300',
    input: 'mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
    select: 'mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
    textarea: 'mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
    error: 'mt-1 text-sm text-red-600 dark:text-red-400',
    helper: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  status: {
    success: 'px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    warning: 'px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    error: 'px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    pending: 'px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    badge: 'px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
  },

  menuItem: {
    base: 'w-full flex items-center px-3 py-2 rounded-lg relative transition-all duration-150 ease-in-out whitespace-nowrap',
    active: 'bg-white/80 dark:bg-white/5 text-purple-600 dark:text-purple-400',
    inactive: 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-white/5',
    indicator: 'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 dark:bg-purple-400 rounded-r-full',
    iconActive: 'text-purple-500 dark:text-purple-400',
    iconInactive: 'text-slate-600 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400'
  },

  mobileMenuButton: 'fixed top-4 left-4 z-[70] p-2 rounded-lg bg-slate-100 dark:bg-gray-800 shadow-lg',
  mobileOverlay: 'fixed inset-0 bg-black/50 z-30',

  nav: {
    item: 'flex items-center px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-white/5',
    itemActive: 'flex items-center px-3 py-2 rounded-lg bg-white/80 dark:bg-white/5 text-purple-600 dark:text-purple-400',
    indicator: 'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 dark:bg-purple-400 rounded-r-full',
  },

  chart: {
    base: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
    container: 'w-full overflow-x-auto',
    wrapper: 'min-w-[600px] h-[300px]',
    legend: {
      wrapper: 'flex flex-wrap justify-center gap-4 mt-6',
      item: 'flex items-center gap-2',
      dot: 'w-3 h-3 rounded-full'
    },
    header: {
      wrapper: 'flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0',
      title: 'text-sm font-medium',
      controls: {
        wrapper: 'flex flex-col md:flex-row items-start md:items-center gap-4',
        value: 'text-sm text-muted-foreground whitespace-nowrap',
        period: {
          wrapper: 'flex gap-2 overflow-x-auto pb-2 md:pb-0',
          button: 'text-sm px-3 py-1.5 rounded-lg transition-colors',
          active: 'bg-slate-900 text-white hover:bg-slate-800',
          inactive: 'hover:bg-slate-100 dark:hover:bg-gray-700'
        }
      }
    }
  },

  datePicker: {
    base: 'w-[300px]'
  },

  stats: {
    card: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4',
    title: 'text-lg font-semibold text-gray-900 dark:text-white mb-4',
    value: 'text-lg sm:text-xl font-bold text-gray-900 dark:text-white',
    valueSuccess: 'text-lg sm:text-xl font-bold text-green-500',
    label: 'text-sm text-gray-600 dark:text-gray-400',
    subtitle: 'text-xs text-muted-foreground'
  },

  pageActions: {
    wrapper: 'flex flex-col md:flex-row gap-4 justify-between items-start md:items-center',
    group: 'flex gap-2 w-full md:w-auto',
    search: {
      wrapper: 'relative w-full md:w-1/3',
      icon: 'absolute left-2 top-2.5 h-4 w-4 text-muted-foreground',
      input: 'pl-8'
    }
  }
} as const;