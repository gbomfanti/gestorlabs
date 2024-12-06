/**
 * Modal de Cadastro de Despesas
 * 
 * Este componente é responsável por renderizar o modal de cadastro de novas despesas financeiras,
 * permitindo o usuário registrar tanto despesas pontuais quanto recorrentes.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateCategoryModal from "@/components/modals/categories/CreateCategoryModal";
import { Category } from "@/components/modals/categories/types";
import { CreateExpenseModalProps, ExpenseFormData, RecurrenceSettings, FrequencyType } from "./types";

export default function CreateExpenseModal({
  open,
  onOpenChange,
  onSubmit,
  categories = []
}: CreateExpenseModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    recurrence_type: 'one_time'
  });
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleCategoryCreated = (newCategory: Category) => {
    console.log("Nova categoria criada:", newCategory);
    setFormData(prev => ({
      ...prev,
      category: String(newCategory.id)
    }));
    
    // Feedback visual
    toast({
      title: "Categoria criada",
      description: `A categoria "${newCategory.name}" foi criada com sucesso.`,
      duration: 3000,
    });
  };

  const handleRecurrenceTypeChange = (value: 'one_time' | 'recurring') => {
    if (value === 'one_time') {
      const { recurrence_settings, ...rest } = formData;
      setFormData({ ...rest, recurrence_type: value });
    } else {
      setFormData({
        ...formData,
        recurrence_type: value,
        recurrence_settings: {
          frequency: 'monthly',
          day_of_month: new Date(formData.date).getDate()
        }
      });
    }
  };

  const updateRecurrenceSettings = (updates: Partial<RecurrenceSettings>) => {
    setFormData(prev => ({
      ...prev,
      recurrence_settings: {
        ...prev.recurrence_settings,
        ...updates
      } as RecurrenceSettings
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
        recurrence_type: 'one_time'
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
      toast({
        title: "Erro ao criar despesa",
        description: "Ocorreu um erro ao criar a despesa. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Despesa</DialogTitle>
            <DialogDescription>
              Registre uma nova despesa no sistema.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                placeholder="Descreva a despesa..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  amount: e.target.value
                }))}
                placeholder="0,00"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category">Categoria</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => setIsCategoryModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Categoria
                </Button>
              </div>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  category: value
                }))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Tipo de Despesa</Label>
              <RadioGroup
                value={formData.recurrence_type}
                onValueChange={handleRecurrenceTypeChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one_time" id="one_time" />
                  <Label htmlFor="one_time">Despesa Única</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recurring" id="recurring" />
                  <Label htmlFor="recurring">Despesa Recorrente</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.recurrence_type === 'recurring' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select
                    value={formData.recurrence_settings?.frequency}
                    onValueChange={(value: FrequencyType) => {
                      updateRecurrenceSettings({ frequency: value });
                    }}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.recurrence_settings?.frequency === 'monthly' && (
                  <div className="space-y-2">
                    <Label htmlFor="day_of_month">Dia do Mês</Label>
                    <Input
                      id="day_of_month"
                      type="number"
                      min="1"
                      max="31"
                      value={formData.recurrence_settings.day_of_month}
                      onChange={(e) => updateRecurrenceSettings({
                        day_of_month: Number(e.target.value)
                      })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="end_date">Data Final (Opcional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.recurrence_settings?.end_date || ''}
                    onChange={(e) => updateRecurrenceSettings({
                      end_date: e.target.value
                    })}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    date: e.target.value
                  }))}
                />
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.description || !formData.amount || !formData.category}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <CreateCategoryModal
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        onSubmit={async (data) => {
          try {
            // Aqui você implementará a criação da categoria quando tiver o backend
            // Por enquanto, vamos simular com um setTimeout
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simula uma nova categoria criada
            const newCategory: Category = {
              id: Date.now(),
              ...data
            };
            
            handleCategoryCreated(newCategory);
            return Promise.resolve();
          } catch (error) {
            toast({
              title: "Erro ao criar categoria",
              description: "Ocorreu um erro ao criar a categoria. Tente novamente.",
              variant: "destructive",
            });
            return Promise.reject(error);
          }
        }}
        context="expense"
      />
    </>
  );
}