//gestor-labs\src\app\(dashboard)\[tenant]\entradas\page.tsx
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
import { ArrowUpCircle, ArrowRightLeft, Clock, AlertCircle, Plus, Filter, Search } from "lucide-react";
import TransactionChart from '@/components/charts/TransactionChart';
import CreateIncomeModal from '@/components/modals/transactions/income/CreateIncomeModal';
import { useCreateIncome } from "@/hooks/modals/categories/use-create-income";
import IncomeTable from '@/components/tables/IncomeTable';

const Page = () => {
  const { setPageInfo } = usePage();
  const { isOpen, setIsOpen, handleSubmit } = useCreateIncome();

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  });

  // Mock categories
  const categories = [
    { id: '1', name: 'Vendas', type: 'income' },
    { id: '2', name: 'Serviços', type: 'income' },
    { id: '3', name: 'Consultoria', type: 'income' },
    { id: '4', name: 'Comissões', type: 'income' },
  ];

  useEffect(() => {
    setPageInfo('Entradas', <ArrowRightLeft className="h-6 w-6" />);
  }, [setPageInfo]);

  // Mock data
  const financialStats = {
    totalEntradas: 9620.00,
    previsaoEntradas: 12500.00,
    entradasPendentes: 2880.00
  };

  // Mock data for the chart
  const mockChartData = [
    { date: '2024-11-10', value: 5000 },
    { date: '2024-11-11', value: 7500 },
    { date: '2024-11-12', value: 3800 },
    { date: '2024-11-13', value: 9200 },
    { date: '2024-11-14', value: 6100 },
    { date: '2024-11-15', value: 8400 },
    { date: '2024-11-16', value: 7300 },
    { date: '2024-11-17', value: 6800 },
    { date: '2024-11-18', value: 8900 },
    { date: '2024-11-19', value: 7600 },
    { date: '2024-11-20', value: 5400 },
    { date: '2024-11-21', value: 6700 },
    { date: '2024-11-22', value: 8200 },
    { date: '2024-11-23', value: 7100 },
    { date: '2024-11-24', value: 9500 },
    { date: '2024-11-25', value: 8300 },
    { date: '2024-11-26', value: 6400 },
    { date: '2024-11-27', value: 7800 },
    { date: '2024-11-28', value: 8600 },
    { date: '2024-11-29', value: 7400 },
    { date: '2024-11-30', value: 6900 }
  ];

  // Add this to your existing mock data
  const mockEntries = [
    {
      id: '1',
      date: '2024-11-29',
      description: 'Consultoria Mensal',
      category: 'Serviços',
      value: 3500.00,
      status: 'confirmed' as const,
    },
    {
      id: '2',
      date: '2024-11-28',
      description: 'Projeto Website',
      category: 'Vendas',
      value: 2800.00,
      status: 'pending' as const,
    },
  ];

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const handleNewIncome = async (data: any) => {
    try {
      await handleSubmit(data);
      console.log('Nova entrada criada:', data);
    } catch (error) {
      console.error('Erro ao criar entrada:', error);
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
          {/* Total de Entradas */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <ArrowUpCircle className="h-5 w-5 text-green-500" />
                <p className={components.stats.label}>Total de Entradas</p>
              </div>
              <p className={components.stats.valueSuccess}>
                {formatCurrency(financialStats.totalEntradas)}
              </p>
            </CardContent>
          </Card>

          {/* Previsão de Entradas */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <Clock className="h-5 w-5 text-blue-500" />
                <p className={components.stats.label}>Previsão de Entradas</p>
              </div>
              <p className={components.stats.value}>
                {formatCurrency(financialStats.previsaoEntradas)}
              </p>
            </CardContent>
          </Card>

          {/* Entradas Pendentes */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <p className={components.stats.label}>Entradas Pendentes</p>
              </div>
              <p className={components.stats.value}>
                {formatCurrency(financialStats.entradasPendentes)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Entradas */}
        <div className={layout.spacing.vertical}>
          <TransactionChart
            type="income"
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
              <span className="ml-2">Nova Entrada</span>
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
              placeholder="Buscar entradas..."
              className="bg-background/50 pl-9"
            />
          </div>
        </div>

        {/* Modal de Nova Entrada */}
        <CreateIncomeModal
          open={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={handleNewIncome}
          categories={categories}
        />

        <div className={layout.spacing.vertical}>
          <IncomeTable
            data={mockEntries}
            onEdit={(id) => console.log('Edit:', id)}
            onDelete={(id) => console.log('Delete:', id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;