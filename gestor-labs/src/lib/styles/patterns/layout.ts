// src/lib/styles/patterns/layout.ts

export const layout = {
  container: {
    base: 'p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg',
    bordered: 'p-3 sm:p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg',
    elevated: 'p-3 sm:p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg',
  },

  section: {
    base: 'space-y-6',
    withTitle: 'space-y-4',
    divided: 'pb-6 border-b border-gray-200 dark:border-gray-700',
  },

  grid: {
    base: 'grid gap-4',
    cards: 'grid gap-4 grid-cols-1 md:grid-cols-2',
    form: 'grid gap-4 grid-cols-1 md:grid-cols-2',
  },

  flex: {
    between: 'flex items-center justify-between',
    column: 'flex flex-col space-y-4',
    btnGroup: 'flex items-center gap-2',
  },

  header: {
    base: 'flex items-center justify-between mb-6',
    withBreadcrumb: 'flex flex-col space-y-2 mb-6',
    withActions: 'flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6',
    withIcon: 'flex items-center gap-2 mb-4',
    datePicker: 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
  },

  sidebar: {
    base: 'fixed top-0 left-0 h-screen flex flex-col justify-between bg-slate-100 dark:bg-[#0B1120] border-r border-slate-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-40 lg:relative lg:translate-x-0 overflow-y-auto overflow-x-hidden',
    collapsed: 'w-20',
    expanded: 'w-64',
    mobileOpen: 'translate-x-0',
    mobileClosed: '-translate-x-full',
    header: 'sticky top-0 bg-slate-100 dark:bg-[#0B1120] p-4 flex items-center justify-between border-b border-slate-200 dark:border-gray-800',
    content: 'flex-1 py-4 overflow-y-auto',
    nav: 'space-y-1 px-3',
    footer: 'sticky bottom-0 bg-slate-100 dark:bg-[#0B1120] border-t border-slate-200 dark:border-gray-800 p-4',
    footerContent: 'space-y-2'
  },

  spacing: {
    vertical: 'space-y-6',
    horizontal: 'space-x-4',
    bottom: 'mb-6',
    content: 'p-3 sm:p-4',
    cardContent: 'space-y-4'
  },

  align: {
    center: 'flex items-center justify-center',
    right: 'flex justify-end',
    between: 'flex justify-between',
  },

  dashboard: {
    wrapper: 'p-4 space-y-6 bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen',
    content: 'p-3 sm:p-4',
    headerWithIcon: 'flex items-center gap-2 mb-4',
    stats: {
      grid: 'grid grid-cols-1 sm:grid-cols-3 gap-4'
    },
    list: {
      vertical: 'space-y-4',
      item: 'flex justify-between items-center',
      itemWithIcon: 'flex items-center gap-2'
    }
  },

  buttonGroup: 'flex gap-2',

  chart: {
    container: 'w-full overflow-x-auto',
    legend: 'flex flex-wrap justify-center gap-4',
    legendItem: 'flex items-center gap-2'
  }
} as const;