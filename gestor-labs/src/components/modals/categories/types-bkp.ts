export interface Category {
  id: string | number;
  name: string;
  type: 'income' | 'expense';
}

export interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (category: Category) => void;
  type?: 'income' | 'expense';
}