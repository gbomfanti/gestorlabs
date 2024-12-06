// src/lib/styles/patterns.ts

import { components } from './patterns/components';
import { layout } from './patterns/layout';
import { text, icon } from './patterns/text-and-icons';
import { transaction } from './patterns/pages/transaction';

// Types para os padrões
export type ComponentPatterns = typeof components;
export type LayoutPatterns = typeof layout;
export type TextPatterns = typeof text;
export type IconPatterns = typeof icon;
export type TransactionPatterns = typeof transaction;

export type UIPatterns = {
  components: ComponentPatterns;
  layout: LayoutPatterns;
  text: TextPatterns;
  icon: IconPatterns;
  pages: {
    transaction: TransactionPatterns;
  };
};

// Objeto unificado de padrões
export const patterns: UIPatterns = {
  components,
  layout,
  text,
  icon,
  pages: {
    transaction
  }
} as const;

// Exports individuais para uso específico
export { components, layout, text, icon, transaction };

// Export default do objeto unificado
export default patterns;