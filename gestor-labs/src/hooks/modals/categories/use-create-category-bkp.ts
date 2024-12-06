import { useState } from 'react';
import { CategoryFormData } from '@/components/modals/categories/types';

export function useCreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implementar integraÃ§Ã£o com API
      console.log('Categoria criada:', data);
      
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    isLoading,
    setIsOpen,
    handleSubmit,
  };
}
