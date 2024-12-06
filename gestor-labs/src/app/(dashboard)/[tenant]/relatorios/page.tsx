"use client";

import React, { useEffect } from 'react';
import { usePage } from '@/contexts/PageContext';
import { Card, CardContent } from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UnderConstruction = () => {
  const { setPageInfo } = usePage();
  const router = useRouter();

  useEffect(() => {
    const icon = <Construction className="h-6 w-6 text-primary dark:text-white" />;
    setPageInfo('Em Construção', icon);
  }, []);

  return (
    <div className="p-4 sm:p-8 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-lg dark:bg-gray-800">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Ícone */}
            <Construction className="h-24 w-24 text-primary dark:text-gray-400" />
            
            {/* Título */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Página em Construção
            </h1>
            
            {/* Mensagem */}
            <p className="text-gray-600 dark:text-gray-300">
              Estamos trabalhando para trazer novidades! Em breve, mais funcionalidades estarão disponíveis.
            </p>
            
            {/* Botão de voltar */}
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mt-8 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderConstruction;