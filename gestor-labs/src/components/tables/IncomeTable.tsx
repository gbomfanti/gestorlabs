// src/components/tables/IncomeTable.tsx
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
import { components } from '@/lib/styles/patterns/components';
import { layout } from '@/lib/styles/patterns/layout';
import { useIsMobile } from '@/hooks/use-mobile';

interface Income {
  id: string;
  date: string;
  description: string;
  category: string;
  value: number;
  status: 'confirmed' | 'pending';
}

interface IncomeTableProps {
  data: Income[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const IncomeTable = ({ data, onEdit, onDelete }: IncomeTableProps) => {
    const isMobile = useIsMobile(); // Using the correct hook name
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2 
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  // Mobile Table View
  const MobileTableView = () => (
    <div className="space-y-4">
      {data.map((income) => (
        <Card key={income.id} className="w-full">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{income.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {income.category}
                </p>
              </div>
              <span 
                className={income.status === 'confirmed' 
                  ? components.status.success 
                  : components.status.warning
                }
              >
                {income.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(income.date)}
                </p>
                <p className="font-medium">
                  {formatCurrency(income.value)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEdit?.(income.id)}
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete?.(income.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Desktop Table View
  const DesktopTableView = () => (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Descrição</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoria</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Valor</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" className="relative px-6 py-4">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((income) => (
            <tr key={income.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {formatDate(income.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {income.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {income.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatCurrency(income.value)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span 
                  className={income.status === 'confirmed' 
                    ? components.status.success 
                    : components.status.warning
                  }
                >
                  {income.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit?.(income.id)}
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete?.(income.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {isMobile ? <MobileTableView /> : <DesktopTableView />}
      </CardContent>
    </Card>
  );
};

export default IncomeTable;