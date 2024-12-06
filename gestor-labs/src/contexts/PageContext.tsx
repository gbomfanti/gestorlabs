'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { 
  LayoutGrid,
  ArrowRightLeft,
  TrendingDown,
  FileBarChart,
  Settings,
  User,
  Tags
} from 'lucide-react';
import ROUTES from '@/lib/routes';

interface PageInfo {
  title: string;
  icon: React.ElementType;
  parent?: string;
}

// Renomeado para PAGE_INFO_MAPPING para evitar conflito
const PAGE_INFO_MAPPING: Record<string, PageInfo> = {
  [ROUTES.DASHBOARD]: { 
    title: 'Visão Geral', 
    icon: LayoutGrid 
  },
  [ROUTES.ENTRIES]: { 
    title: 'Entradas', 
    icon: ArrowRightLeft 
  },
  [ROUTES.EXPENSES]: { 
    title: 'Saídas', 
    icon: TrendingDown 
  },
  [ROUTES.REPORTS]: { 
    title: 'Relatórios', 
    icon: FileBarChart 
  },
  [ROUTES.SETTINGS]: { 
    title: 'Configurações', 
    icon: Settings 
  },
  [ROUTES.CATEGORIES]: { 
    title: 'Gestão de Categorias', 
    icon: Tags,
    parent: ROUTES.SETTINGS
  },
  [ROUTES.PROFILE]: { 
    title: 'Perfil', 
    icon: User 
  }
};

interface PageContextType {
  pageTitle: string;
  pageIcon: ReactNode;
  breadcrumb: string[];
  setPageInfo: (title: string | string[], icon: ReactNode) => void;
  updatePageFromPath: (path: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState('Visão Geral');
  const [pageIcon, setPageIcon] = useState<ReactNode>(
    <LayoutGrid className="h-6 w-6 text-primary dark:text-white" />
  );
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Visão Geral']);

  const buildBreadcrumb = useCallback((path: string): string[] => {
    // Remove trailing slash e query params
    const cleanPath = path.replace(/\/$/, '').split('?')[0];
    
    const parts = cleanPath.split('/').filter(Boolean);
    const breadcrumb: string[] = [];
    let currentPath = '';

    for (let i = 0; i < parts.length; i++) {
      if (i === 0 && parts[i] === 'dashboard') {
        currentPath = ROUTES.DASHBOARD;
      } else {
        currentPath += `/${parts[i]}`;
      }

      const pageInfo = PAGE_INFO_MAPPING[currentPath];
      if (pageInfo) {
        breadcrumb.push(pageInfo.title);
        
        // Se tiver um parent, insere o título do parent antes
        if (pageInfo.parent && !breadcrumb.includes(PAGE_INFO_MAPPING[pageInfo.parent].title)) {
          breadcrumb.splice(breadcrumb.length - 1, 0, PAGE_INFO_MAPPING[pageInfo.parent].title);
        }
      }
    }

    return breadcrumb.length > 0 ? breadcrumb : ['Visão Geral'];
  }, []);

  const setPageInfo = useCallback((
    title: string | string[], 
    icon: ReactNode
  ) => {
    if (Array.isArray(title)) {
      setBreadcrumb(title);
      setPageTitle(title[title.length - 1]);
    } else {
      setBreadcrumb([title]);
      setPageTitle(title);
    }
    setPageIcon(icon);
  }, []);

  const updatePageFromPath = useCallback((path: string) => {
    const cleanPath = path.replace(/\/$/, '').split('?')[0];
    const pageInfo = PAGE_INFO_MAPPING[cleanPath];
    
    if (pageInfo) {
      const Icon = pageInfo.icon;
      const breadcrumbItems = buildBreadcrumb(path);
      
      setBreadcrumb(breadcrumbItems);
      setPageTitle(pageInfo.title);
      setPageIcon(<Icon className="h-6 w-6 text-primary dark:text-white" />);
    }
  }, [buildBreadcrumb]);

  const value = {
    pageTitle,
    pageIcon,
    breadcrumb,
    setPageInfo,
    updatePageFromPath
  };

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}

// Exportando o mapeamento de páginas se necessário em outro lugar
export { PAGE_INFO_MAPPING };