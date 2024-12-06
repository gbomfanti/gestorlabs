"use client";

import React, { useState, useEffect } from 'react';
import { usePage } from '../contexts/PageContext';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  RefreshCw,
  Package,
  Briefcase,
  MonitorPlay,
  Box,
  Users2,
  GraduationCap,
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
  BarChart2,
  PieChart as PieChartIcon,
  LayoutDashboard
} from "lucide-react";

// Componente do Card de Gráfico
const ChartCard = ({ title, data, isExpense = false }) => {
  const [chartType, setChartType] = useState('pie');

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const chartDataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(0)
  }));

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartDataWithPercentage}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
                percentage
              }) => {
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
                    className="text-sm font-medium dark:fill-white"
                  >
                    {`${chartDataWithPercentage[index].name} (${percentage}%)`}
                  </text>
                );
              }}
            >
              {chartDataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              labelFormatter={(index) => chartDataWithPercentage[index].name}
              contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
              itemStyle={{ color: 'var(--foreground)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tick={false}
            height={20}
            stroke="var(--foreground)"
          />
          <YAxis stroke="var(--foreground)" />
          <Tooltip
            formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
            itemStyle={{ color: 'var(--foreground)' }}
          />
          <Bar dataKey="value" fill="#4F46E5">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="dark:bg-gray-800">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-lg font-semibold dark:text-white">{title}</h2>
          <div className="flex gap-2">
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
              className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
              className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          {renderChart()}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm dark:text-white">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Overview = () => {
  const { setPageInfo } = usePage();

  useEffect(() => {
    const icon = <LayoutDashboard className="h-6 w-6 text-primary dark:text-white" />;
    setPageInfo('Visão Geral', icon);
  }, []);

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString().split('T')[0];
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString().split('T')[0];

  const [dateRange, setDateRange] = useState({
    from: firstDayOfMonth,
    to: lastDayOfMonth
  });

  const financialSummary = {
    totalDespesas: 2140.00,
    totalReceitas: 9620.00,
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
    { name: "Serviços Avulsos", value: 120.00, color: "#F59E0B" },
    { name: "Co-Produção", value: 3100.00, color: "#8B5CF6" }
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

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (value) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Date Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <span className="dark:text-white">até</span>
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Resumo Financeiro */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Resumo Financeiro</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Receitas</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(financialSummary.totalReceitas)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Despesas</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(financialSummary.totalDespesas)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saldo</p>
              <p className="text-xl sm:text-2xl font-bold text-green-500">
                {formatCurrency(financialSummary.saldo)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Entradas e Saídas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Entradas */}
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpCircle className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-semibold dark:text-white">Entradas</h2>
            </div>
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <entry.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-white">{entry.name}</span>
                  </div>
                  <span className="font-semibold dark:text-white">{formatCurrency(entry.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Saídas */}
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <ArrowDownCircle className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold dark:text-white">Saídas</h2>
            </div>
            <div className="space-y-4">
              {expenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <expense.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-white">{expense.name}</span>
                  </div>
                  <span className="font-semibold dark:text-white">{formatCurrency(expense.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de Gráficos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Gráfico de Receitas */}
        <ChartCard
          title="Distribuição de Receitas"
          data={revenueChartData}
        />

        {/* Gráfico de Despesas */}
        <ChartCard
          title="Distribuição de Despesas"
          data={expenseChartData}
          isExpense={true}
        />
      </div>

      {/* Próximos Vencimentos */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-semibold dark:text-white">Próximos Vencimentos</h2>
          </div>
          <div className="space-y-4">
            {upcomingPayments.map((payment, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium dark:text-white">{payment.client}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{payment.date}</p>
                </div>
                <span className="font-semibold dark:text-white">{formatCurrency(payment.value)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;