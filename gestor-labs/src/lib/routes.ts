// src/lib/routes.ts

export const ROUTES = {
    // Rotas principais
    DASHBOARD: '/dashboard',
    ENTRIES: '/dashboard/entradas',
    EXPENSES: '/dashboard/saidas',
    REPORTS: '/dashboard/relatorios',
  
  // Configurações
  SETTINGS: '/dashboard/configuracoes',
  CATEGORIES: '/dashboard/configuracoes/categorias',
  
  // Perfil
  PROFILE: '/dashboard/perfil',
} as const;

  
  // Type auxiliar para extrair as chaves do objeto ROUTES
  export type RoutesKeys = keyof typeof ROUTES;
  
  // Type auxiliar para extrair os valores do objeto ROUTES
  export type RoutesValues = typeof ROUTES[RoutesKeys];
  
  // Função auxiliar para verificar se uma rota existe
  export function isValidRoute(route: string): route is RoutesValues {
    return Object.values(ROUTES).includes(route as RoutesValues);
  }
  
  // Função auxiliar para obter uma rota por sua chave
  export function getRoute(key: RoutesKeys): string {
    return ROUTES[key];
  }
  
  export default ROUTES;