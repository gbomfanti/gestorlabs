/**
 * Hook para Gerenciamento do Modal de Despesas
 * 
 * Este hook centraliza a lógica de estado e operações do modal de cadastro
 * de despesas, incluindo o gerenciamento de estado de loading e submissão do formulário.
 */

import { useState } from 'react';
import { ExpenseFormData } from '@/components/modals/transactions/expense/types';

export function useCreateExpense() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ExpenseFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implementar integração com API
      console.log('Despesa criada:', data);
      
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
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