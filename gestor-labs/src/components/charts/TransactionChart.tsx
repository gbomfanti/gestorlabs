'use client'

import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps
} from 'recharts'
import { components } from '@/lib/styles/patterns/components'
import { patterns } from '@/lib/styles'
import { cn } from '@/lib/utils'

interface TransactionData {
  date: string
  value: number
}

interface TransactionChartProps {
  data: TransactionData[]
  type: 'income' | 'expense'
  dateRange?: {
    from: Date | undefined
    to: Date | undefined
  }
  isLoading?: boolean
}

const useChartColors = (type: 'income' | 'expense') => {
  return useMemo(() => {
    return type === 'income'
      ? { main: '#3B82F6', light: '#DBEAFE' }  // Azul para receitas
      : { main: '#EF4444', light: '#FEE2E2' }  // Vermelho para despesas
  }, [type])
}

const PeriodButtons = ({
  selectedPeriod,
  onPeriodChange
}: {
  selectedPeriod: number
  onPeriodChange: (days: number) => void
}) => {
  const periods = [
    { label: '7 dias', value: 7 },
    { label: '15 dias', value: 15 },
    { label: '30 dias', value: 30 }
  ]

  return (
    <div className="flex justify-center gap-2 w-full md:w-auto">
      {periods.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onPeriodChange(value)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm transition-colors flex-1 md:flex-none",
            selectedPeriod === value
              ? "bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700"
              : "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700",
            "border border-gray-200 dark:border-gray-700"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

const TransactionChart = ({
  data,
  type,
  dateRange,
  isLoading = false,
}: TransactionChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState(30)
  const chartColors = useChartColors(type)

  const filteredData = useMemo(() => {
    if (!data.length) return []

    const today = new Date()
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
    
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - selectedPeriod + 1)
    startDate.setHours(0, 0, 0, 0)

    const dateArray = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dateArray.map(date => {
      const matchingData = data.find(item => {
        const itemDate = new Date(item.date)
        return itemDate.getDate() === date.getDate() &&
               itemDate.getMonth() === date.getMonth() &&
               itemDate.getFullYear() === date.getFullYear()
      })

      return {
        date: date.toISOString(),
        value: matchingData?.value || 0
      }
    })
  }, [data, selectedPeriod])

  const total = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.value, 0)
  }, [filteredData])

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).replace(' de ', ' ').replace('.', '')
  }

  if (isLoading) {
    return (
      <div className={components.chart.base}>
        <div className={components.chart.container}>
          <div className={components.chart.wrapper}>
            {/* Adicionar skeleton ou loading spinner aqui */}
          </div>
        </div>
      </div>
    )
  }

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null

    const value = payload[0].value
    if (typeof value !== 'number') return null

    return (
      <div className={patterns.pages.transaction.chart.tooltip.wrapper}>
        <p className={patterns.pages.transaction.chart.tooltip.text}>
          {formatDate(label || '')}
        </p>
        <p className={patterns.pages.transaction.chart.tooltip.text}>
          {type === 'income' ? 'Receita' : 'Despesa'}: {formatCurrency(value)}
        </p>
      </div>
    )
  }

  if (!filteredData.length) {
    return (
      <div className={components.chart.base}>
        <div className="p-4 flex justify-center items-center h-[300px]">
          <span className="text-sm text-muted-foreground">
            Nenhum dado encontrado para o período selecionado
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={components.chart.base}>
      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0">
          <h3 className="text-sm font-medium uppercase text-center md:text-left">
            GRÁFICO DE <span className="text-primary">FATURAMENTO</span>
          </h3>
          <span className="text-sm font-medium uppercase block md:hidden">
            TOTAL {formatCurrency(total)}
          </span>
        </div>

        <div className="flex flex-col items-center md:items-center space-y-4 md:space-y-0 md:flex-row md:gap-4 mt-4 md:mt-0">
          <span className="hidden md:block text-sm font-medium uppercase md:my-auto">
            TOTAL {formatCurrency(total)}
          </span>
          <div className="w-full md:w-auto">
            <PeriodButtons
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
          </div>
        </div>
      </div>

      <div className={cn(
        components.chart.container,
        'relative',
        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-4 before:bg-gradient-to-r before:from-white before:to-transparent before:dark:from-gray-800 before:z-10 before:pointer-events-none lg:before:hidden',
        'after:absolute after:right-0 after:top-0 after:bottom-0 after:w-4 after:bg-gradient-to-l after:from-white after:to-transparent after:dark:from-gray-800 after:z-10 after:pointer-events-none lg:after:hidden',
      )}>
        <div className={cn(
          patterns.pages.transaction.chart.wrapper,
          'px-4',
          'scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent'
        )}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors.main} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={chartColors.main} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickFormatter={(value) => formatCurrency(value)
                  .replace('R$', '')
                  .trim()
                }
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={80}
                tickCount={6}
                domain={['auto', 'auto']}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColors.main}
                strokeWidth={2}
                fill={`url(#gradient-${type})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default TransactionChart