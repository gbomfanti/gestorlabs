"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePage } from '@/contexts/PageContext';
import {
  Tags,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { CATEGORY_ICONS, CategoryIconType, renderCategoryIcon } from '@/lib/constants/category-icons';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from '@/lib/routes';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import CreateCategoryModal from '@/components/modals/categories/CreateCategoryModal';
import { useCreateCategory } from '@/hooks/modals/categories/use-create-category';
import type { Category } from '@/components/modals/categories/types';

interface TableCategory extends Category {
  transactions: number;
}

type SortConfig = {
  key: keyof TableCategory | null;
  direction: 'asc' | 'desc' | null;
};

const CategoriesPage = () => {
  const router = useRouter();
  const { setPageInfo } = usePage();
  const { toast } = useToast();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  // Integração com o modal de criação
  const {
    isOpen,
    closeModal,
    setIsOpen: openModal,
    handleSubmit
  } = useCreateCategory({
    context: 'settings' as const,
    onSuccess: (newCategory: Category) => {
      // Atualizar a lista de categorias
      setCategories(prev => [...prev, {
        ...newCategory,
        transactions: 0
      }]);
      
      // Feedback visual
      toast({
        title: "Categoria criada",
        description: "A categoria foi criada com sucesso.",
      });
    }
  });

  // Dados de exemplo atualizados com ícones
  const [categories, setCategories] = useState<TableCategory[]>([
    { id: 1, name: 'Marketing', type: 'expense', icon: 'monitor', transactions: 45 },
    { id: 2, name: 'Infoprodutos', type: 'income', icon: 'package', transactions: 32 },
    { id: 3, name: 'Serviços', type: 'income', icon: 'briefcase', transactions: 28 },
    { id: 4, name: 'Software', type: 'expense', icon: 'box', transactions: 15 },
  ]);

  // Função para ordenar os dados
  const sortData = (key: keyof TableCategory) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...categories].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setCategories(sortedData);
    setSortConfig({ key, direction });
  };

  // Componente para o cabeçalho da coluna com ordenação
  const SortableHeader = ({ 
    column, 
    label 
  }: { 
    column: keyof TableCategory, 
    label: string 
  }) => {
    const renderSortIcon = () => {
      if (sortConfig.key !== column) {
        return <ArrowUpDown className="ml-1 h-4 w-4" />;
      }
      return sortConfig.direction === 'asc' ? (
        <ArrowUp className="ml-1 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-1 h-4 w-4" />
      );
    };    

    return (
      <Button
        variant="ghost"
        onClick={() => sortData(column)}
        className="h-8 p-0 hover:bg-transparent hover:text-primary flex items-center gap-1 font-medium"
      >
        {label}
        {renderSortIcon()}
      </Button>
    );
  };

  useEffect(() => {
    const icon = <Tags className="h-6 w-6 text-primary dark:text-white" />;
    setPageInfo(['Configurações', 'Gestão de Categorias'], icon);
  }, [setPageInfo]);

  const handleBack = () => {
    router.push(ROUTES.SETTINGS);
  };

  // Estatísticas das categorias
  const categoryStats = {
    total: categories.length,
    income: categories.filter(c => c.type === 'income').length,
    expense: categories.filter(c => c.type === 'expense').length,
  };

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Botão Voltar */}
        <Button
          variant="ghost"
          className="gap-2 hover:bg-transparent hover:text-primary"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Configurações
        </Button>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoryStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {categoryStats.total} categorias ativas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Categorias de Receita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoryStats.income}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((categoryStats.income / categoryStats.total) * 100)}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Categorias de Despesa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoryStats.expense}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((categoryStats.expense / categoryStats.total) * 100)}% do total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Barra de ações */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={openModal}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar categorias..." className="pl-8" />
          </div>
        </div>

        {/* Tabela */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <SortableHeader column="name" label="Nome" />
                  </TableHead>
                  <TableHead>
                    <SortableHeader column="type" label="Tipo" />
                  </TableHead>
                  <TableHead>
                    <SortableHeader column="icon" label="Ícone" />
                  </TableHead>
                  <TableHead>
                    <SortableHeader column="transactions" label="Total de Transações" />
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {renderCategoryIcon(category.icon, "h-4 w-4 text-muted-foreground")}
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          category.type === 'income'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {category.type === 'income' ? 'Receita' : 'Despesa'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {renderCategoryIcon(category.icon, "h-4 w-4 text-muted-foreground")}
                        <code className="px-2 py-1 bg-muted rounded text-xs">
                          {CATEGORY_ICONS[category.icon].label}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell>{category.transactions}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:text-destructive"
                        disabled={category.transactions > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dica informativa */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Categorias com transações associadas não podem ser excluídas</p>
        </div>
      </div>

      {/* Modal de criação de categoria */}
      <CreateCategoryModal 
        open={isOpen}
        onOpenChange={closeModal}
        onSubmit={handleSubmit}
        context="settings"
      />

      <Toaster />
    </>
  );
};

export default CategoriesPage;