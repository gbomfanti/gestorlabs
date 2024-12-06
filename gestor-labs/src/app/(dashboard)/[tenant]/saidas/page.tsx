//gestor-labs\src\app\(dashboard)\[tenant]\saidas\page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { layout } from '@/lib/styles/patterns/layout';
import { components } from '@/lib/styles/patterns/components';
import { icon } from '@/lib/styles/patterns/text-and-icons';
import { usePage } from '@/contexts/PageContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DateRangePicker, { DateRange } from '@/components/DateRangePicker';
import {
  ArrowDownCircle,
  TrendingDown,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  Search
} from "lucide-react";
import TransactionChart from '@/components/charts/TransactionChart';
import CreateExpenseModal from "@/components/modals/transactions/expense/CreateExpenseModal";
import { useCreateExpense } from "@/hooks/modals/transactions/use-create-expense";
import ExpenseTable from '@/components/tables/ExpenseTable';
import { Category } from "@/components/modals/categories/types";

const Page = () => {
  const { setPageInfo } = usePage();
  const { isOpen, setIsOpen, handleSubmit } = useCreateExpense();

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  });

  // Mock categories for expenses
  const categories: Category[] = [
    { id: '1', name: 'Anúncios', type: 'expense' },
    { id: '2', name: 'Software', type: 'expense' },
    { id: '3', name: 'Infraestrutura', type: 'expense' },
    { id: '4', name: 'Fornecedores', type: 'expense' },
    { id: '5', name: 'Fixas', type: 'expense' }
  ];

  useEffect(() => {
    setPageInfo('Saídas', <TrendingDown className="h-6 w-6" />);
  }, [setPageInfo]);

  // Mock data for statistics
  const financialStats = {
    totalSaidas: 7840.00,
    previsaoSaidas: 9200.00,
    saidasPendentes: 1360.00
  };

  // Mock data for the chart
  const mockChartData = [
    { date: '2024-11-10', value: 2500 },
    { date: '2024-11-11', value: 3200 },
    { date: '2024-11-12', value: 1800 },
    { date: '2024-11-13', value: 4200 },
    { date: '2024-11-14', value: 2900 },
    { date: '2024-11-15', value: 3600 },
    { date: '2024-11-16', value: 3100 },
    { date: '2024-11-17', value: 2800 },
    { date: '2024-11-18', value: 3900 },
    { date: '2024-11-19', value: 3400 },
    { date: '2024-11-20', value: 2600 },
    { date: '2024-11-21', value: 3100 },
    { date: '2024-11-22', value: 3800 },
    { date: '2024-11-23', value: 3300 },
    { date: '2024-11-24', value: 4100 },
    { date: '2024-11-25', value: 3700 },
    { date: '2024-11-26', value: 2900 },
    { date: '2024-11-27', value: 3400 },
    { date: '2024-11-28', value: 3800 },
    { date: '2024-11-29', value: 3200 },
    { date: '2024-11-30', value: 3100 }
  ];

  // Mock data for the table
  const mockExpenses = [
    {
      id: '1',
      date: '2024-11-29',
      description: 'Marketing Digital',
      category: 'Anúncios',
      value: 2500.00,
      status: 'confirmed' as const,
    },
    {
      id: '2',
      date: '2024-11-28',
      description: 'Assinatura Software',
      category: 'Software',
      value: 1800.00,
      status: 'pending' as const,
    },
  ];

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const handleNewExpense = async (data: any) => {
    try {
      await handleSubmit(data);
      console.log('Nova saída criada:', data);
    } catch (error) {
      console.error('Erro ao criar saída:', error);
    }
  };

  return (
    <div className={layout.dashboard.wrapper}>
      <div className="flex-1 flex flex-col space-y-6 overflow-y-auto pb-24">
        {/* DateRangePicker */}
        <div className={layout.header.datePicker}>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            className={components.datePicker.base}
          />
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total de Saídas */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <ArrowDownCircle className="h-5 w-5 text-red-500" />
                <p className={components.stats.label}>Total de Saídas</p>
              </div>
              <p className={`${components.stats.value} text-red-600`}>
                {formatCurrency(financialStats.totalSaidas)}
              </p>
            </CardContent>
          </Card>

          {/* Previsão de Saídas */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <Clock className="h-5 w-5 text-blue-500" />
                <p className={components.stats.label}>Previsão de Saídas</p>
              </div>
              <p className={components.stats.value}>
                {formatCurrency(financialStats.previsaoSaidas)}
              </p>
            </CardContent>
          </Card>

          {/* Saídas Pendentes */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <p className={components.stats.label}>Saídas Pendentes</p>
              </div>
              <p className={components.stats.value}>
                {formatCurrency(financialStats.saidasPendentes)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Saídas */}
        <div className={layout.spacing.vertical}>
          <TransactionChart
            type="expense"
            data={mockChartData}
            dateRange={dateRange}
            isLoading={false}
          />
        </div>

        {/* Actions Section */}
        <div className={components.pageActions.wrapper}>
          <div className={components.pageActions.group}>
            <Button
              onClick={() => setIsOpen(true)}
              variant="default"
              size="sm"
            >
              <Plus className={icon.size.sm} />
              <span className="ml-2">Nova Saída</span>
            </Button>

            <Button
              onClick={() => {/* TODO: Open filter */ }}
              variant="outline"
              size="sm"
              className="bg-white dark:bg-gray-800"
            >
              <Filter className={icon.size.sm} />
              <span className="ml-2">Filtrar</span>
            </Button>
          </div>

          <div className={components.pageActions.search.wrapper}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar saídas..."
              className="bg-background/50 pl-9"
            />
          </div>
        </div>

        {/* Modal de Nova Saída */}
        <CreateExpenseModal
          open={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={handleNewExpense}
          categories={categories}
        />

        {/* Tabela de Saídas */}
        <div className={layout.spacing.vertical}>
          <ExpenseTable
            data={mockExpenses}
            onEdit={(id) => console.log('Edit:', id)}
            onDelete={(id) => console.log('Delete:', id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;