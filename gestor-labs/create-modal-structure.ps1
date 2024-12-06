# Script para criar estrutura de modals
$rootPath = ".\src"

# Função para criar diretório se não existir
function EnsureDirectory {
    param([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Criado diretório: $path" -ForegroundColor Green
    }
}

# Função para criar arquivo com conteúdo
function CreateFile {
    param(
        [string]$path,
        [string]$content
    )
    if (-not (Test-Path $path)) {
        New-Item -ItemType File -Path $path -Force | Out-Null
        Set-Content -Path $path -Value $content -Encoding UTF8
        Write-Host "Criado arquivo: $path" -ForegroundColor Yellow
    }
}

# Criar estrutura de diretórios
$directories = @(
    "$rootPath\components\modals\categories",
    "$rootPath\components\modals\transactions\income",
    "$rootPath\components\modals\transactions\expense",
    "$rootPath\components\modals\shared",
    "$rootPath\hooks\modals\categories",
    "$rootPath\hooks\modals\transactions"
)

foreach ($dir in $directories) {
    EnsureDirectory $dir
}

# Conteúdo dos arquivos

# Types
$typesContent = @'
export interface CategoryFormData {
  name: string;
  type: 'income' | 'expense';
  description?: string;
}

export interface Category extends CategoryFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
'@

# CreateCategoryModal
$createModalContent = @'
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryFormData } from './types';

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryFormData) => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = React.useState<CategoryFormData>({
    name: '',
    type: 'income',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', type: 'income', description: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogDescription>
              Crie uma nova categoria para organizar suas entradas e saídas.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'income' | 'expense') => 
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="expense">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                className="col-span-3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
'@

# Hook
$hookContent = @'
import { useState } from 'react';
import { CategoryFormData } from '@/components/modals/categories/types';

export function useCreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implementar integração com API
      console.log('Categoria criada:', data);
      
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    isLoading,
    setIsOpen,
    handleSubmit,
  };
}
'@

# Criar arquivos
$files = @{
    "$rootPath\components\modals\categories\types.ts" = $typesContent
    "$rootPath\components\modals\categories\CreateCategoryModal.tsx" = $createModalContent
    "$rootPath\hooks\modals\categories\use-create-category.ts" = $hookContent
}

foreach ($file in $files.GetEnumerator()) {
    CreateFile -path $file.Key -content $file.Value
}

Write-Host "`nEstrutura criada com sucesso!" -ForegroundColor Green
Write-Host "Verifique os arquivos e ajuste as importações conforme necessário." -ForegroundColor Yellow