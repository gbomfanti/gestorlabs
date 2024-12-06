"use client";

import React, { useEffect, useState } from 'react';
import { layout } from '@/lib/styles/patterns/layout';
import { components } from '@/lib/styles/patterns/components';
import { icon } from '@/lib/styles/patterns/text-and-icons';
import { usePage } from '@/contexts/PageContext';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tags,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUpCircle,
  ArrowDownCircle,
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
  const isMobile = useIsMobile();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  // Mock data
  const [categories, setCategories] = useState<TableCategory[]>([
    { id: 1, name: 'Marketing', type: 'expense', icon: 'monitor', transactions: 45 },
    { id: 2, name: 'Infoprodutos', type: 'income', icon: 'package', transactions: 32 },
    { id: 3, name: 'Serviços', type: 'income', icon: 'briefcase', transactions: 28 },
    { id: 4, name: 'Software', type: 'expense', icon: 'box', transactions: 15 },
  ]);

  // Modal integration
  const {
    isOpen,
    closeModal,
    setIsOpen: openModal,
    handleSubmit
  } = useCreateCategory({
    context: 'settings' as const,
    onSuccess: (newCategory: Category) => {
      setCategories(prev => [...prev, {
        ...newCategory,
        transactions: 0
      }]);

      toast({
        title: "Categoria criada",
        description: "A categoria foi criada com sucesso.",
      });
    }
  });

  // Sort functionality
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

  // Category statistics
  const categoryStats = {
    total: categories.length,
    income: categories.filter(c => c.type === 'income').length,
    expense: categories.filter(c => c.type === 'expense').length,
  };

  useEffect(() => {
    const icon = <Tags className="h-6 w-6" />;
    setPageInfo(['Configurações', 'Gestão de Categorias'], icon);
  }, [setPageInfo]);

  const handleBack = () => {
    router.push(ROUTES.SETTINGS);
  };

  return (
    <div className={layout.dashboard.wrapper}>
      <div className="flex-1 flex flex-col space-y-6 overflow-y-auto pb-24">
        {/* Back Button */}
        <div className="px-6"> {/* Adicionamos um wrapper com o mesmo padding dos outros conteúdos */}
          <Button
            variant="ghost"
            className="gap-2 hover:bg-transparent hover:text-primary px-0"
            onClick={handleBack}
          >
            <ArrowLeft className={icon.size.sm} />
            Voltar para Configurações
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Categories */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <Tags className="h-5 w-5 text-primary" />
                <p className={components.stats.label}>Total de Categorias</p>
              </div>
              <p className={components.stats.value}>{categoryStats.total}</p>
              <p className="text-xs text-muted-foreground">
                {categoryStats.total} categorias ativas
              </p>
            </CardContent>
          </Card>

          {/* Income Categories */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <ArrowUpCircle className="h-5 w-5 text-green-500" />
                <p className={components.stats.label}>Categorias de Receita</p>
              </div>
              <p className={components.stats.value}>{categoryStats.income}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((categoryStats.income / categoryStats.total) * 100)}% do total
              </p>
            </CardContent>
          </Card>

          {/* Expense Categories */}
          <Card className={components.card.stats}>
            <CardContent className={layout.spacing.content}>
              <div className={layout.dashboard.headerWithIcon}>
                <ArrowDownCircle className="h-5 w-5 text-red-500" />
                <p className={components.stats.label}>Categorias de Despesa</p>
              </div>
              <p className={components.stats.value}>{categoryStats.expense}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((categoryStats.expense / categoryStats.total) * 100)}% do total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Section */}
        <div className={components.pageActions.wrapper}>
          <div className={components.pageActions.group}>
            <Button
              onClick={() => openModal(true)}
              variant="default"
              size="sm"
            >
              <Plus className={icon.size.sm} />
              <span className="ml-2">Nova Categoria</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-gray-800"
            >
              <Filter className={icon.size.sm} />
              <span className="ml-2">Filtrar</span>
            </Button>
          </div>

          <div className={components.pageActions.search.wrapper}>
            <Search className={components.pageActions.search.icon} />
            <Input
              placeholder="Buscar categorias..."
              className={components.pageActions.search.input}
            />
          </div>
        </div>

        {/* Categories Table/List */}
        <Card className={components.card.base}>
          <CardContent className="p-0">
            {isMobile ? (
              // Mobile View - Lista de Cards
              <div className="divide-y divide-border">
                {categories.map((category) => (
                  <div key={category.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {renderCategoryIcon(category.icon, "h-4 w-4 text-muted-foreground")}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
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
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${category.type === 'income'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                      >
                        {category.type === 'income' ? 'Receita' : 'Despesa'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {category.transactions} transações
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop View - Tabela
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
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${category.type === 'income'
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
            )}
          </CardContent>
        </Card>

        {/* Info Tip */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Categorias com transações associadas não podem ser excluídas</p>
        </div>

        {/* Create Category Modal */}
        <CreateCategoryModal
          open={isOpen}
          onOpenChange={closeModal}
          onSubmit={handleSubmit}
          context="settings"
        />

        <Toaster />
      </div>
    </div>
  );
};

export default CategoriesPage;