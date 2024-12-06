/**
 * Gestor Labs UI Patterns - Responsive
 * 
 * Responsabilidades:
 * - Definição de breakpoints padrão
 * - Classes responsivas comuns
 * - Utilitários de visibilidade mobile/desktop
 * - Padrões para adaptação de layout em diferentes telas
 * 
 * Uso:
 * import { responsive } from '@/lib/styles/patterns/responsive'
 * className={responsive.container.base}
 */

export const responsive = {
    // Containers responsivos
    container: {
      // Container que se adapta aos breakpoints padrão
      base: 'w-full px-4 md:px-6 lg:px-8',
      // Container com largura máxima
      max: 'w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8',
      // Container mais estreito para conteúdo focado
      narrow: 'w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8',
    },
  
    // Comportamentos de exibição
    display: {
      // Elemento visível apenas em mobile
      onlyMobile: 'block md:hidden',
      // Elemento visível apenas em tablet e desktop
      onlyDesktop: 'hidden md:block',
      // Elemento visível apenas em desktop
      onlyLargeScreen: 'hidden lg:block',
    },
  
    // Adaptações de texto
    text: {
      // Tamanho de texto responsivo
      adaptive: 'text-sm md:text-base lg:text-lg',
      // Título responsivo
      title: 'text-xl md:text-2xl lg:text-3xl font-bold',
      // Subtítulo responsivo
      subtitle: 'text-lg md:text-xl lg:text-2xl',
    },
  
    // Espaçamentos responsivos
    spacing: {
      // Padding vertical responsivo
      py: 'py-4 md:py-6 lg:py-8',
      // Padding horizontal responsivo
      px: 'px-4 md:px-6 lg:px-8',
      // Margin vertical responsiva
      my: 'my-4 md:my-6 lg:my-8',
      // Margin horizontal responsiva
      mx: 'mx-4 md:mx-6 lg:mx-8',
    },
  
    // Grids responsivos
    grid: {
      // 1 coluna em mobile, 2 em tablet, 3 em desktop
      cols1to3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
      // 1 coluna em mobile, 2 em desktop
      cols1to2: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
      // Lista em mobile, grid em desktop
      adaptive: 'flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
      // Dashboard specific grids
      dashboard: {
        stats: 'grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6',
        charts: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'
      }
    },
  
    // Flexbox responsivo
    flex: {
      // Muda direção em breakpoints
      stack: 'flex flex-col md:flex-row items-start md:items-center gap-4',
      // Alinhamento responsivo
      between: 'flex flex-col md:flex-row justify-between items-center gap-4',
    }
} as const;