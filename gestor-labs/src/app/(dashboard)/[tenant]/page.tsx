//gestor-labs\src\app\(dashboard)\[tenant]\page.tsx (visão geral)
"use client";

import React, { useState, useEffect } from 'react';
import { layout } from '@/lib/styles/patterns/layout';
import { components } from '@/lib/styles/patterns/components';
import { usePage } from '@/contexts/PageContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DateRangePicker, { DateRange } from '@/components/DateRangePicker';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Users, RefreshCw, Package, Briefcase, MonitorPlay, Box, 
  Users2, GraduationCap, ArrowUpCircle, ArrowDownCircle, 
  Clock, BarChart2, PieChart as PieChartIcon, LayoutDashboard
} from "lucide-react";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ChartCardProps {
  title: string;
  data: ChartData[];
  isExpense?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, data, isExpense = false }) => {
  const [chartType, setChartType] = useState('pie');
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const chartDataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(0)
  }));

  return (
    <Card className={components.card.base}>
      <CardContent className={layout.spacing.content}>
        <div className={layout.flex.between}>
          <h2 className={components.card.title}>{title}</h2>
          <div className={layout.flex.btnGroup}>
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={components.chart.container}>
          <ResponsiveContainer width="100%" height={350}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={chartDataWithPercentage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({cx, cy, midAngle, outerRadius, index}) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 1.2;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill={chartDataWithPercentage[index].color}
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                        className="text-sm font-medium"
                      >
                        {`${chartDataWithPercentage[index].name} (${chartDataWithPercentage[index].percentage}%)`}
                      </text>
                    );
                  }}
                >
                  {chartDataWithPercentage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
                <Bar dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className={components.chart.legend.wrapper}>
          {data.map((entry, index) => (
            <div key={index} className={components.chart.legend.item}>
              <div
                className={components.chart.legend.dot}
                style={{ backgroundColor: entry.color }}
              />
              <span className={components.stats.label}>{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  const { setPageInfo } = usePage();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  });

  useEffect(() => {
    setPageInfo('Visão Geral', <LayoutDashboard className="h-6 w-6" />);
  }, [setPageInfo]);

  // Mock data
  const financialSummary = {
    totalReceitas: 9620.00,
    totalDespesas: 2140.00,
    saldo: 7480.00
  };

  const entries = [
    { name: "Novos Clientes", value: 1200.00, icon: Users },
    { name: "Renovações", value: 4500.00, icon: RefreshCw },
    { name: "Infoprodutos", value: 700.00, icon: Package },
    { name: "Serviços Avulsos", value: 120.00, icon: Briefcase }
  ];

  const expenses = [
    { name: "Anúncios", value: 500.00, icon: MonitorPlay },
    { name: "Softwares", value: 120.00, icon: Box },
    { name: "Colaboradores", value: 1400.00, icon: Users2 },
    { name: "Cursos", value: 120.00, icon: GraduationCap }
  ];

  const revenueChartData = [
    { name: "Novos Clientes", value: 1200.00, color: "#3B82F6" },
    { name: "Renovações", value: 4500.00, color: "#22C55E" },
    { name: "Infoprodutos", value: 700.00, color: "#EF4444" },
    { name: "Serviços Avulsos", value: 120.00, color: "#F59E0B" }
  ];

  const expenseChartData = [
    { name: "Anúncios", value: 500.00, color: "#DC2626" },
    { name: "Softwares", value: 120.00, color: "#7C3AED" },
    { name: "Colaboradores", value: 1400.00, color: "#2563EB" },
    { name: "Cursos", value: 120.00, color: "#059669" }
  ];

  const upcomingPayments = [
    { client: "Cliente A", date: "10/11/2024", value: 500.00 },
    { client: "Cliente B", date: "12/11/2024", value: 750.00 },
    { client: "Cliente C", date: "15/11/2024", value: 1200.00 },
    { client: "Cliente D", date: "18/11/2024", value: 300.00 }
  ];

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
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

        {/* Resumo Financeiro */}
        <Card className={components.card.stats}>
          <CardContent className={layout.spacing.content}>
            <h2 className={components.card.title}>Resumo Financeiro</h2>
            <div className={layout.dashboard.stats.grid}>
              <div>
                <p className={components.stats.label}>Total Receitas</p>
                <p className={components.stats.value}>
                  {formatCurrency(financialSummary.totalReceitas)}
                </p>
              </div>
              <div>
                <p className={components.stats.label}>Total Despesas</p>
                <p className={components.stats.value}>
                  {formatCurrency(financialSummary.totalDespesas)}
                </p>
              </div>
              <div>
                <p className={components.stats.label}>Saldo</p>
                <p className={components.stats.valueSuccess}>
                  {formatCurrency(financialSummary.saldo)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Entradas/Saídas em grid 2 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Entradas */}
          <Card className={components.card.base}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <ArrowUpCircle className="h-5 w-5 text-green-500" />
                <h2 className={components.card.titleWithIcon}>Entradas</h2>
              </div>
              <div className={layout.dashboard.list.vertical}>
                {entries.map((entry, index) => (
                  <div key={index} className={layout.dashboard.list.item}>
                    <div className={layout.dashboard.list.itemWithIcon}>
                      <entry.icon className="h-5 w-5" />
                      <span className={components.stats.label}>{entry.name}</span>
                    </div>
                    <span className={components.stats.value}>
                      {formatCurrency(entry.value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card Saídas */}
          <Card className={components.card.base}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <ArrowDownCircle className="h-5 w-5 text-red-500" />
                <h2 className={components.card.titleWithIcon}>Saídas</h2>
              </div>
              <div className={layout.dashboard.list.vertical}>
                {expenses.map((expense, index) => (
                  <div key={index} className={layout.dashboard.list.item}>
                    <div className={layout.dashboard.list.itemWithIcon}>
                      <expense.icon className="h-5 w-5" />
                      <span className={components.stats.label}>{expense.name}</span>
                    </div>
                    <span className={components.stats.value}>
                      {formatCurrency(expense.value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos em grid 2 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Distribuição de Receitas" data={revenueChartData} />
          <ChartCard title="Distribuição de Despesas" data={expenseChartData} isExpense />
        </div>

        {/* Próximos Vencimentos */}
        <Card className={components.card.base}>
          <CardContent className={layout.spacing.content}>
            <div className={layout.dashboard.headerWithIcon}>
              <Clock className="h-5 w-5" />
              <h2 className={components.card.titleWithIcon}>Próximos Vencimentos</h2>
            </div>
            <div className={layout.dashboard.list.vertical}>
              {upcomingPayments.map((payment, index) => (
                <div key={index} className={layout.dashboard.list.item}>
                  <div>
                    <p className={components.stats.label}>{payment.client}</p>
                    <p className={components.stats.label}>{payment.date}</p>
                  </div>
                  <span className={components.stats.value}>
                    {formatCurrency(payment.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;