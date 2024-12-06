// src/components/layout/Sidebar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ArrowRightLeft,
    TrendingDown,
    FileBarChart,
    Settings,
    User,
    Moon,
    Sun,
    ChevronLeft,
    ChevronRight,
    Menu,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ROUTES from '../../lib/routes';

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const menuItems = [
        {
            title: 'Visão Geral',
            icon: <LayoutDashboard className="w-5 h-5" />,
            path: ROUTES.DASHBOARD
        },
        {
            title: 'Entradas',
            icon: <ArrowRightLeft className="w-5 h-5" />,
            path: ROUTES.ENTRIES
        },
        {
            title: 'Saídas',
            icon: <TrendingDown className="w-5 h-5" />,
            path: ROUTES.EXPENSES
        },
        {
            title: 'Relatórios',
            icon: <FileBarChart className="w-5 h-5" />,
            path: ROUTES.REPORTS
        }
    ];
    
    const bottomMenuItems = [
        {
            title: 'Perfil',
            icon: <User className="w-5 h-5" />,
            path: ROUTES.PROFILE
        },
        {
            title: 'Configurações',
            icon: <Settings className="w-5 h-5" />,
            path: ROUTES.SETTINGS
        }
    ];

    return (
        <>
            {/* Botão de menu mobile */}
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="fixed top-4 left-4 z-[70] p-2 rounded-lg bg-slate-100 dark:bg-gray-800 shadow-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}

            {/* Overlay para mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-screen
                    flex flex-col justify-between
                    bg-slate-100 dark:bg-[#0B1120]
                    border-r border-slate-200 dark:border-gray-800
                    transition-all duration-300 ease-in-out
                    ${isCollapsed && !isMobile ? 'w-20' : 'w-64'}
                    ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}
                    z-40
                    lg:relative
                    lg:translate-x-0
                    overflow-y-auto
                    overflow-x-hidden
                `}
            >
                {/* Header */}
                <div className="sticky top-0 bg-slate-100 dark:bg-[#0B1120] p-4 flex items-center justify-between border-b border-slate-200 dark:border-gray-800">
                    {!isCollapsed && (
                        <span className="text-xl font-bold text-slate-800 dark:text-white truncate">
                            Gestor Labs
                        </span>
                    )}
                    {!isMobile && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-800 flex-shrink-0"
                        >
                            {isCollapsed ?
                                <ChevronRight className="w-5 h-5 text-slate-500 dark:text-gray-400" /> :
                                <ChevronLeft className="w-5 h-5 text-slate-500 dark:text-gray-400" />
                            }
                        </button>
                    )}
                </div>

                {/* Main Menu */}
                <div className="flex-1 py-4 overflow-y-auto">
                    <nav className="space-y-1 px-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    router.push(item.path);
                                    if (isMobile) setIsSidebarOpen(false);
                                }}
                                className={`
                                    w-full flex items-center px-3 py-2 rounded-lg 
                                    relative transition-all duration-150 ease-in-out
                                    ${pathname === item.path
                                        ? 'bg-white/80 dark:bg-white/5 text-purple-600 dark:text-purple-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-white/5'
                                    }
                                    whitespace-nowrap
                                `}
                            >
                                {/* Indicador de seleção */}
                                {pathname === item.path && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 dark:bg-purple-400 rounded-r-full" />
                                )}

                                {/* Icon wrapper */}
                                <div className={`
                                    ${pathname === item.path
                                        ? 'text-purple-500 dark:text-purple-400'
                                        : 'text-slate-600 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400'
                                    }
                                `}>
                                    {item.icon}
                                </div>

                                {!isCollapsed && (
                                    <span className="ml-3 truncate">{item.title}</span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Bottom Menu */}
                <div className="sticky bottom-0 bg-slate-100 dark:bg-[#0B1120] border-t border-slate-200 dark:border-gray-800 p-4">
                    <div className="space-y-2">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`
                                w-full flex items-center px-3 py-2 rounded-lg 
                                relative transition-all duration-150 ease-in-out
                                text-slate-600 dark:text-slate-400
                                hover:bg-white/60 dark:hover:bg-white/5
                                whitespace-nowrap
                            `}
                        >
                            {isDarkMode ?
                                <Sun className="w-5 h-5" /> :
                                <Moon className="w-5 h-5" />
                            }
                            {!isCollapsed && (
                                <span className="ml-3 truncate">
                                    {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                                </span>
                            )}
                        </button>

                        {bottomMenuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    router.push(item.path);
                                    if (isMobile) setIsSidebarOpen(false);
                                }}
                                className={`
                                    w-full flex items-center px-3 py-2 rounded-lg 
                                    relative transition-all duration-150 ease-in-out
                                    ${pathname === item.path
                                        ? 'bg-white/80 dark:bg-white/5 text-purple-600 dark:text-purple-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-white/5'
                                    }
                                    whitespace-nowrap
                                `}
                            >
                                {/* Indicador de seleção */}
                                {pathname === item.path && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 dark:bg-purple-400 rounded-r-full" />
                                )}

                                {/* Icon wrapper */}
                                <div className={`
                                    ${pathname === item.path
                                        ? 'text-purple-500 dark:text-purple-400'
                                        : 'text-slate-600 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400'
                                    }
                                `}>
                                    {item.icon}
                                </div>

                                {!isCollapsed && (
                                    <span className="ml-3 truncate">{item.title}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;