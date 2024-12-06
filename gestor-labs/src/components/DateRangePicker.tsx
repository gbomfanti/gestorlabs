"use client";

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, isAfter, isBefore, isEqual, isValid as isValidDate, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
  hasTransactions?: (date: Date) => boolean;
}

export default function DateRangePicker({
  value,
  onChange,
  className,
  hasTransactions
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalDateRange, setInternalDateRange] = useState<DateRange>(value ?? { from: undefined, to: undefined });
  const [selectedMonth, setSelectedMonth] = useState(value?.from ?? new Date());

  useEffect(() => {
    setInternalDateRange(value ?? { from: undefined, to: undefined });
  }, [value]);

  const shortcuts = [
    {
      label: "Este mês",
      description: "Seleciona todo o mês atual",
      onClick: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        updateDateRange({ from: start, to: end }, true);
      }
    },
    {
      label: "Mês anterior",
      description: "Seleciona todo o mês anterior",
      onClick: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        updateDateRange({ from: start, to: end }, true);
      }
    },
    {
      label: "Este trimestre",
      description: "Seleciona o trimestre atual",
      onClick: () => {
        const now = new Date();
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const start = new Date(now.getFullYear(), currentQuarter * 3, 1);
        const end = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0);
        updateDateRange({ from: start, to: end }, true);
      }
    },
    {
      label: "Este ano",
      description: "Seleciona o ano atual completo",
      onClick: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31);
        updateDateRange({ from: start, to: end }, true);
      }
    }
  ];

  const updateDateRange = (newRange: DateRange, shouldClose: boolean = false) => {
    setInternalDateRange(newRange);
    onChange?.(newRange);
    if (shouldClose) {
      setOpen(false);
    }
  };

  const handleDayClick = (day: Date) => {
    if (!isValidDate(day)) return;

    if (!internalDateRange.from || (internalDateRange.from && internalDateRange.to)) {
      // First click or reset after a complete selection
      updateDateRange({ from: day, to: undefined });
    } else {
      // Second click
      if (isAfter(day, internalDateRange.from)) {
        updateDateRange({ from: internalDateRange.from, to: day }, true);
      } else {
        // If second date is before first, restart selection
        updateDateRange({ from: day, to: undefined });
      }
    }
  };

  const isDaySelected = (day: Date) => {
    if (!internalDateRange.from && !internalDateRange.to) return false;
    return (internalDateRange.from && isEqual(internalDateRange.from, day)) || 
           (internalDateRange.to && isEqual(internalDateRange.to, day));
  };

  const isDayInRange = (day: Date) => {
    if (!internalDateRange.from || !internalDateRange.to) return false;
    return isWithinInterval(day, { 
      start: internalDateRange.from, 
      end: internalDateRange.to 
    });
  };

  const formatDateRange = () => {
    if (!internalDateRange.from) return "Selecione o período";
    if (!internalDateRange.to) return format(internalDateRange.from, "dd/MM/yyyy", { locale: ptBR });
    return `${format(internalDateRange.from, "dd/MM/yyyy", { locale: ptBR })} até ${format(internalDateRange.to, "dd/MM/yyyy", { locale: ptBR })}`;
  };

  const generateDaysArray = () => {
    const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    
    const days: (Date | null)[] = [];
    
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day));
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setSelectedMonth(newMonth);
  };

  const isToday = (day: Date) => {
    const today = new Date();
    return isEqual(day, today);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal transition-all duration-200",
            !internalDateRange.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          <TooltipProvider delayDuration={200}>
            <div className="w-[160px] border-r p-3 space-y-1 bg-muted/50">
              {shortcuts.map((shortcut, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-normal"
                      onClick={shortcut.onClick}
                    >
                      {shortcut.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" sideOffset={20} className="z-50">
                    <p className="text-sm">{shortcut.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>

          <div className="p-3">
            <div className="flex items-center justify-between mb-4 px-1">
              <Button
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={() => changeMonth(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {format(selectedMonth, "MMMM yyyy", { locale: ptBR })}
              </span>
              <Button
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={() => changeMonth(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div
                  key={day}
                  className="text-xs font-medium text-muted-foreground p-2"
                >
                  {day}
                </div>
              ))}

              {generateDaysArray().map((day, index) => (
                <div key={index} className="relative">
                  {day ? (
                    <Button
                      variant="ghost"
                      className={cn(
                        "h-8 w-8 p-0 font-normal text-sm transition-all duration-200",
                        isDaySelected(day) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        !isDaySelected(day) && isDayInRange(day) && "bg-primary/10 text-primary hover:bg-primary/20",
                        isToday(day) && "border-2 border-primary",
                        hasTransactions?.(day) && "ring-2 ring-primary/50"
                      )}
                      onClick={() => handleDayClick(day)}
                    >
                      {day.getDate()}
                    </Button>
                  ) : (
                    <div className="h-8 w-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}