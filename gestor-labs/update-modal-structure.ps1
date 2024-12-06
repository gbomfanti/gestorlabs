# Definir encoding para UTF-8
$OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8

# Script para atualizar estrutura de modals
$rootPath = ".\src"

# Função para criar diretório se não existir
function EnsureDirectory {
    param([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Criado diretorio: $path" -ForegroundColor Green
    } else {
        Write-Host "Diretorio ja existe: $path" -ForegroundColor Blue
    }
}

# Função para criar ou atualizar arquivo
function UpdateFile {
    param(
        [string]$path,
        [string]$content,
        [bool]$forceUpdate = $false
    )
    $exists = Test-Path $path
    if (-not $exists -or $forceUpdate) {
        [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
        if ($exists) {
            Write-Host "Atualizado arquivo: $path" -ForegroundColor Yellow
        } else {
            Write-Host "Criado arquivo: $path" -ForegroundColor Green
        }
    } else {
        Write-Host "Arquivo ja existe: $path" -ForegroundColor Blue
    }
}

# Criar estrutura adicional de diretórios para transações
$newDirectories = @(
    "$rootPath\components\modals\transactions\income",
    "$rootPath\components\modals\transactions\expense"
)

foreach ($dir in $newDirectories) {
    EnsureDirectory $dir
}

# Criar arquivos de exemplo para transações
$incomeModalContent = @'
import React from "react";
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

interface CreateIncomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const CreateIncomeModal: React.FC<CreateIncomeModalProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = React.useState({
    description: "",
    amount: "",
    date: "",
    category: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ description: "", amount: "", date: "", category: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova Entrada</DialogTitle>
            <DialogDescription>
              Adicione uma nova entrada ao sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                className="col-span-3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Valor
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                className="col-span-3"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
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

export default CreateIncomeModal;
'@

$incomeHookContent = @'
import { useState } from "react";

interface IncomeFormData {
  description: string;
  amount: string;
  date: string;
  category: string;
}

export function useCreateIncome() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: IncomeFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implementar integracao com API
      console.log("Entrada criada:", data);
      
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao criar entrada:", error);
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

# Criar novos arquivos
$newFiles = @{
    "$rootPath\components\modals\transactions\income\CreateIncomeModal.tsx" = $incomeModalContent
    "$rootPath\hooks\modals\transactions\use-create-income.ts" = $incomeHookContent
}

foreach ($file in $newFiles.GetEnumerator()) {
    UpdateFile -path $file.Key -content $file.Value
}

Write-Host "`nEstrutura atualizada com sucesso!" -ForegroundColor Green
Write-Host "Novos componentes de transacoes foram adicionados." -ForegroundColor Yellow

# Sumário das atualizações
Write-Host "`nNovos arquivos criados:" -ForegroundColor Cyan
Write-Host "src/"
Write-Host "  ├── components/"
Write-Host "  │   └── modals/"
Write-Host "  │       └── transactions/"
Write-Host "  │           └── income/"
Write-Host "  │               └── CreateIncomeModal.tsx"
Write-Host "  └── hooks/"
Write-Host "      └── modals/"
Write-Host "          └── transactions/"
Write-Host "              └── use-create-income.ts"

Write-Host "`nProximos passos:" -ForegroundColor Magenta
Write-Host "1. Verifique as importacoes nos novos arquivos"
Write-Host "2. Implemente a integracao com a API no hook useCreateIncome"
Write-Host "3. Adicione validacoes nos formularios"
Write-Host "4. Teste os novos componentes"