/**
 * Página de Entradas
 * 
 * Visualização e gerenciamento de receitas/entradas financeiras,
 * incluindo gráficos, listagem e cadastro de novas receitas.
 */

"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import DateRangePicker, { DateRange } from '@/components/DateRangePicker';
import CreateIncomeModal from '@/components/modals/transactions/income/CreateIncomeModal';
import { useCreateIncome } from "../../../../hooks/modals/categories/use-create-income";

// Função para gerar dados mockados consistentes
const generateMockData = (days: number) => {
  const data = [];
  const baseDate = new Date('2024-11-10');
  const baseValue = 2500;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    const dayValue = i % 7;
    const variation = Math.sin(dayValue) * 1000 + (dayValue * 100);
    const value = Math.max(baseValue + variation, 500);
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', ''),
      value: Number(value.toFixed(2)),
      timestamp: date.toISOString()
    });
  }
  return data;
};

const EntradasPage = () => {
  // Hook do modal de criação de entrada
  const { isOpen, setIsOpen, handleSubmit } = useCreateIncome();

  // Mock de categorias (posteriormente virá da API)
  const categories = [
    { id: '1', name: 'Vendas', type: 'income' },
    { id: '2', name: 'Serviços', type: 'income' },
    { id: '3', name: 'Consultoria', type: 'income' },
    { id: '4', name: 'Comissões', type: 'income' },
  ];

  // Estado do DateRangePicker
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date('2024-11-01'),
    to: new Date('2024-11-30')
  });

  // Estado para período do gráfico
  const [graphPeriod, setGraphPeriod] = useState('30');

  // Dados mockados para o gráfico
  const revenueData = {
    '7': generateMockData(7),
    '15': generateMockData(15),
    '30': generateMockData(30)
  };

  // Calcular total do período selecionado
  const totalRevenue = revenueData[graphPeriod].reduce((sum, item) => sum + item.value, 0);

  // Dados mockados para a tabela
  const [entradas] = useState([
    {
      id: 1,
      data: '2024-10-30',
      descricao: 'Pagamento Cliente A',
      categoria: 'Vendas',
      valor: 2500.00,
      status: 'Confirmado'
    },
    {
      id: 2,
      data: '2024-10-29',
      descricao: 'Consultoria Empresa B',
      categoria: 'Serviços',
      valor: 1800.00,
      status: 'Pendente'
    }
  ]);

  // Handler para mudança no DateRangePicker
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  // Handler para nova entrada
  const handleNewIncome = async (data: any) => {
    try {
      await handleSubmit(data);
      console.log('Nova entrada criada:', data);
    } catch (error) {
      console.error('Erro ao criar entrada:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Date Range Picker */}
      <div className="w-fit">
        <DateRangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          className="w-[280px]"
        />
      </div>

      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Entradas (Período)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.300,00</div>
            <p className="text-xs text-muted-foreground">+12.5% em relação ao período anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Previsão de Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.850,00</div>
            <p className="text-xs text-muted-foreground">3 novas entradas previstas no período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Entradas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">-2 em relação ao período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Faturamento */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">GRÁFICO DE FATURAMENTO</CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                VENDAS R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGraphPeriod('7')}
                  className={graphPeriod === '7' 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'hover:bg-slate-100'}
                >
                  7 dias
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGraphPeriod('15')}
                  className={graphPeriod === '15' 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'hover:bg-slate-100'}
                >
                  15 dias
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGraphPeriod('30')}
                  className={graphPeriod === '30' 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'hover:bg-slate-100'}
                >
                  30 dias
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[300px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData[graphPeriod]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                dx={-10}
                tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
                tick={{ fill: '#666' }}
              />
              <Tooltip 
                formatter={(value) => [
                  `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                  "Valor"
                ]}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2563eb" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Barra de ações */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            className="bg-slate-900 hover:bg-slate-800"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Entrada
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar entradas..." className="pl-8" />
        </div>
      </div>

      {/* Tabela de entradas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entradas.map((entrada) => (
                <TableRow key={entrada.id}>
                  <TableCell>{new Date(entrada.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{entrada.descricao}</TableCell>
                  <TableCell>{entrada.categoria}</TableCell>
                  <TableCell>
                    {entrada.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      entrada.status === 'Confirmado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {entrada.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">Editar</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Nova Entrada */}
      <CreateIncomeModal 
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleNewIncome}
        categories={categories}
      />
    </div>
  );
};

export default EntradasPage;