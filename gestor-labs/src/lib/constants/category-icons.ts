import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Users,
  RefreshCw,
  Package,
  Briefcase,
  MonitorPlay,
  Box,
  Users2,
  GraduationCap,
  Wallet,
  CreditCard,
  Building2,
  BookOpen,
  Repeat,
  ShoppingCart,
  Gift,
  Phone,
} from 'lucide-react';

interface CategoryIcon {
  icon: LucideIcon;
  label: string;
  description: string;
}

export const CATEGORY_ICONS: Record<string, CategoryIcon> = {
  // Ícones para Receitas
  users: { icon: Users, label: 'Usuários', description: 'Ideal para categorias relacionadas a clientes' },
  refresh: { icon: RefreshCw, label: 'Renovação', description: 'Para recorrências e renovações' },
  package: { icon: Package, label: 'Produto', description: 'Para produtos físicos ou digitais' },
  briefcase: { icon: Briefcase, label: 'Serviços', description: 'Para serviços prestados' },
  wallet: { icon: Wallet, label: 'Carteira', description: 'Para receitas gerais' },
  gift: { icon: Gift, label: 'Presente', description: 'Para bonificações ou presentes' },

  // Ícones para Despesas
  monitor: { icon: MonitorPlay, label: 'Monitor', description: 'Para despesas com publicidade' },
  box: { icon: Box, label: 'Software', description: 'Para despesas com sistemas' },
  users2: { icon: Users2, label: 'Equipe', description: 'Para despesas com pessoal' },
  graduation: { icon: GraduationCap, label: 'Educação', description: 'Para cursos e treinamentos' },
  creditCard: { icon: CreditCard, label: 'Cartão', description: 'Para despesas financeiras' },
  building2: { icon: Building2, label: 'Prédio', description: 'Para despesas com instalações' },
  book: { icon: BookOpen, label: 'Livro', description: 'Para material didático' },
  repeat: { icon: Repeat, label: 'Recorrente', description: 'Para despesas recorrentes' },
  cart: { icon: ShoppingCart, label: 'Compras', description: 'Para compras gerais' },
  phone: { icon: Phone, label: 'Telefone', description: 'Para despesas com comunicação' }
};

// Tipo que representa as chaves do objeto CATEGORY_ICONS
export type CategoryIconType = keyof typeof CATEGORY_ICONS;

// Helper function para renderizar um ícone
export const renderCategoryIcon = (iconName: CategoryIconType, className?: string): JSX.Element => {
  const Icon = CATEGORY_ICONS[iconName].icon;
  return React.createElement(Icon, { className: className || "h-4 w-4" });
};

// Helper para obter apenas os ícones recomendados para cada tipo
export const getIconsByType = (type: 'income' | 'expense'): Record<string, CategoryIcon> => {
  const recommendedIcons = {
    income: ['users', 'refresh', 'package', 'briefcase', 'wallet', 'gift'],
    expense: ['monitor', 'box', 'users2', 'graduation', 'creditCard', 'building2', 'book', 'repeat', 'cart', 'phone']
  };

  return recommendedIcons[type].reduce((acc: Record<string, CategoryIcon>, iconKey: string) => {
    if (iconKey in CATEGORY_ICONS) {
      acc[iconKey] = CATEGORY_ICONS[iconKey];
    }
    return acc;
  }, {});
};