"use client";

import { useState, useEffect } from "react";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateCategoryModalProps, CategoryFormData } from "./types";
import { CATEGORY_ICONS, CategoryIconType, getIconsByType } from "@/lib/constants/category-icons";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  icon: z.string().min(1, "Selecione um ícone"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateCategoryModal({
  open,
  onOpenChange,
  onSubmit,
  context = "settings",
  initialData,
  isLoading = false,
}: CreateCategoryModalProps) {
  // Define o tipo inicial baseado no contexto ou dados iniciais
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>(
    initialData?.type || (context === 'expense' ? 'expense' : 'income')
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      icon: initialData?.icon || "",
    },
  });

  // Reseta o ícone quando o tipo muda
  useEffect(() => {
    // Verifica se o ícone atual ainda é válido para o novo tipo
    const currentIcon = form.getValues('icon');
    const validIcons = Object.keys(getIconsByType(selectedType));
    
    if (currentIcon && !validIcons.includes(currentIcon)) {
      form.setValue('icon', '');
    }
  }, [selectedType, form]);

  const handleSubmit = async (data: FormData) => {
    const formData: CategoryFormData = {
      ...data,
      type: selectedType,
    };
    await onSubmit(formData);
  };

  // Função para obter os ícones filtrados baseado no contexto e tipo
  const getFilteredIcons = () => {
    // Se estiver em um contexto específico (income/expense), ou no settings
    // retorna apenas os ícones apropriados para o tipo selecionado
    return Object.entries(getIconsByType(selectedType));
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    if ((context === 'income' && type === 'expense') || 
        (context === 'expense' && type === 'income')) {
      return; // Impede a mudança se o contexto não permitir
    }
    setSelectedType(type);
    // Reseta explicitamente o ícone ao mudar o tipo
    form.setValue('icon', '');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para organizar suas {selectedType === 'income' ? 'receitas' : 'despesas'}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Campo Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Ex: Marketing Digital, Consultoria..." 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seleção de Tipo (sempre visível, mas com interatividade controlada) */}
            <div className="space-y-2">
              <Label>Tipo</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={selectedType === 'income' ? 'default' : 'outline'}
                  className={cn(
                    "flex-1",
                    context === 'expense' && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleTypeChange('income')}
                  disabled={context === 'expense'}
                >
                  Receita
                </Button>
                <Button
                  type="button"
                  variant={selectedType === 'expense' ? 'default' : 'outline'}
                  className={cn(
                    "flex-1",
                    context === 'income' && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleTypeChange('expense')}
                  disabled={context === 'income'}
                >
                  Despesa
                </Button>
              </div>
            </div>

            {/* Seleção de Ícone */}
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone</FormLabel>
                  <div className="grid grid-cols-4 gap-2">
                    {getFilteredIcons().map(([key, { icon: Icon, label }]) => (
                      <Button
                        key={key}
                        type="button"
                        variant={field.value === key ? 'default' : 'outline'}
                        className={cn(
                          "h-12 p-0",
                          field.value === key && "border-2 border-primary"
                        )}
                        onClick={() => field.onChange(key)}
                        title={label}
                      >
                        <Icon className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}