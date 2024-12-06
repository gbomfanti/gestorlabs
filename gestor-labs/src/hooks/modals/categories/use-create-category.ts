import { useState } from 'react';
import { Category, CategoryFormData } from '@/components/modals/categories/types';

interface UseCreateCategoryProps {
  context?: 'settings' | 'income' | 'expense';
  onSuccess?: (category: Category) => void;
  initialData?: Partial<CategoryFormData>;
}

export function useCreateCategory({ 
  context = 'settings', 
  onSuccess, 
  initialData 
}: UseCreateCategoryProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Integração com API
      // Simulando uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulando resposta da API
      const newCategory: Category = {
        id: Date.now(), // Temporário, será substituído pelo ID real da API
        name: data.name,
        type: data.type,
        icon: data.icon
      };

      // Fecha o modal
      setIsOpen(false);

      // Chama o callback de sucesso se existir
      if (onSuccess) {
        onSuccess(newCategory);
      }

    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      setError(error instanceof Error ? error.message : 'Erro ao criar categoria');
      
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setIsLoading(false);
  };

  const openModal = () => {
    resetState();
    setIsOpen(true);
  };

  const closeModal = () => {
    resetState();
    setIsOpen(false);
  };

  return {
    isOpen,
    isLoading,
    error,
    initialData,
    context,
    setIsOpen: openModal,
    handleSubmit,
    closeModal,
  };
}