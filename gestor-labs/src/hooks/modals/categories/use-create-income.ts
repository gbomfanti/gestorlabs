"use client";

import { useState } from 'react';

interface IncomeFormData {
  description: string;
  amount: string;
  date: string;
  category: string;
}

export function useCreateIncome() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: IncomeFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implementar integração com API
      console.log('Entrada criada:', data);
      
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar entrada:', error);
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

export type { IncomeFormData };