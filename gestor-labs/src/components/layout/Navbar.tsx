'use client';

import { Bell } from 'lucide-react';
import { usePage } from '../../contexts/PageContext';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile'; // Importando o mesmo hook usado no Sidebar

const Navbar = () => {
  const { pageTitle, pageIcon } = usePage();
  const isMobile = useIsMobile();

  return (
    <header className="h-20 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-[60]">
      <div className={`h-full flex items-center justify-between ${isMobile ? 'pl-20 pr-4' : 'px-8'}`}>
        {/* Título da página atual */}
        <div className="flex items-center space-x-4">
          <div className="text-primary dark:text-white">
            {pageIcon}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>

        {/* Ações do usuário */}
        <div className="flex items-center space-x-6">
          {/* Notificações */}
          <button 
            className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Notificações"
          >
            <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <span 
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" 
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
