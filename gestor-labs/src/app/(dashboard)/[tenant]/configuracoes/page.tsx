"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { layout } from '@/lib/styles/patterns/layout';
import { components } from '@/lib/styles/patterns/components';
import { usePage } from '@/contexts/PageContext';
import { Settings, Tags, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ROUTES } from '@/lib/routes';

const Page = () => {
  const router = useRouter();
  const { setPageInfo } = usePage();

  useEffect(() => {
    setPageInfo('Configurações', <Settings className="h-6 w-6" />);
  }, [setPageInfo]);

  const settingsSections = [
    {
      title: 'Gestão de Categorias',
      description: 'Gerencie suas categorias de receitas e despesas para melhor organização das suas finanças',
      icon: <Tags className="h-5 w-5" />,
      onClick: () => router.push(ROUTES.CATEGORIES),
    },
    // Adicione outras seções de configurações aqui quando necessário
  ];

  return (
    <div className={layout.dashboard.wrapper}>
      {/* Main content container com flex-1 para ocupar o espaço disponível */}
      <div className="flex flex-col min-h-[calc(100vh-5rem)]">
        {/* Container de conteúdo com padding e scroll */}
        <div className="flex-1 flex flex-col space-y-6 pb-24 px-4 md:px-0">
          {/* Cabeçalho */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-muted-foreground">
              Escolha uma seção para configurar
            </h2>
          </div>

          {/* Seções de Configurações - Container centralizado */}
          <div className="w-full max-w-3xl mx-auto space-y-4">
            {settingsSections.map((section, index) => (
              <Card
                key={index}
                className="hover:border-primary/50 dark:hover:border-primary/50 transition-colors cursor-pointer"
                onClick={section.onClick}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/10">
                        {section.icon}
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Seções Futuras - Container centralizado */}
          <div className="w-full max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="font-medium">Mais configurações em breve</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Estamos trabalhando para trazer mais opções de personalização para sua experiência
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Flex spacer para empurrar o footer para baixo */}
          <div className="flex-1" />
        </div>

        {/* Footer fixado na parte inferior */}
        <footer className="w-full py-4 border-t border-border mt-auto">
          <div className="text-center text-sm text-muted-foreground">
            <p>Gestor Labs v0.1.0</p>
            <p className="mt-1">© 2024 Gestor Labs. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Page;