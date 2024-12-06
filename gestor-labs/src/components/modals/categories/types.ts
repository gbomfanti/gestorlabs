import { LucideIcon } from 'lucide-react';
import { CategoryIconType } from '@/lib/constants/category-icons';

// Interface principal da categoria
export interface Category {
  id: string | number;
  name: string;
  type: 'income' | 'expense';
  icon: CategoryIconType;
}

// Dados do formulário de criação/edição
export interface CategoryFormData {
  name: string;
  type: 'income' | 'expense';
  icon: CategoryIconType;
}

// Props do modal
export interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  context?: 'settings' | 'income' | 'expense';
  initialData?: Partial<CategoryFormData>;
  isLoading?: boolean;
  onSuccess?: (category: Category) => void;
}

// Interface para os ícones de categoria (para referência, já que está definida em category-icons.ts)
export interface CategoryIcon {
  icon: LucideIcon;
  label: string;
  description: string;
}