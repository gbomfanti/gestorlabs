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
import { CreateCategoryModalProps } from "./types";

export default function CreateCategoryModal({
  open,
  onOpenChange,
  onSuccess,
  type = "income",
}: CreateCategoryModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsLoading(true);
    try {
      // Aqui vai a lógica de cadastro da categoria
      // Por enquanto apenas simulando uma API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Após o cadastro bem sucedido
      if (onSuccess) {
        onSuccess({
          id: Date.now(), // Temporário, será o ID retornado pela API
          name,
          type
        });
      }
      setName("");
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para organizar suas {type === 'income' ? 'receitas' : 'despesas'}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Freelance, Consultoria..."
              className="w-full"
            />
          </div>

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
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? "Criando..." : "Criar Categoria"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}