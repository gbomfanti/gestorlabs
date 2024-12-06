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
import { patterns } from '@/lib/styles';
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
            icon: <LayoutDashboard className={patterns.icon.size.md} />,
            path: ROUTES.DASHBOARD
        },
        {
            title: 'Entradas',
            icon: <ArrowRightLeft className={patterns.icon.size.md} />,
            path: ROUTES.ENTRIES
        },
        {
            title: 'Saídas',
            icon: <TrendingDown className={patterns.icon.size.md} />,
            path: ROUTES.EXPENSES
        },
        {
            title: 'Relatórios',
            icon: <FileBarChart className={patterns.icon.size.md} />,
            path: ROUTES.REPORTS
        }
    ];
    
    const bottomMenuItems = [
        {
            title: 'Perfil',
            icon: <User className={patterns.icon.size.md} />,
            path: ROUTES.PROFILE
        },
        {
            title: 'Configurações',
            icon: <Settings className={patterns.icon.size.md} />,
            path: ROUTES.SETTINGS
        }
    ];

    return (
        <>
            {/* Botão de menu mobile */}
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={patterns.components.mobileMenuButton}
                >
                    <Menu className={patterns.icon.size.md} />
                </button>
            )}

            {/* Overlay para mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className={patterns.components.mobileOverlay}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    ${patterns.layout.sidebar.base}
                    ${isCollapsed && !isMobile ? patterns.layout.sidebar.collapsed : patterns.layout.sidebar.expanded}
                    ${isMobile ? (isSidebarOpen ? patterns.layout.sidebar.mobileOpen : patterns.layout.sidebar.mobileClosed) : ''}
                `}
            >
                {/* Header */}
                <div className={patterns.layout.sidebar.header}>
                    {!isCollapsed && (
                        <span className={patterns.text.logo}>
                            Gestor Labs
                        </span>
                    )}
                    {!isMobile && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={patterns.components.iconButton.ghost}
                        >
                            {isCollapsed ?
                                <ChevronRight className={patterns.icon.size.md} /> :
                                <ChevronLeft className={patterns.icon.size.md} />
                            }
                        </button>
                    )}
                </div>

                {/* Main Menu */}
                <div className={patterns.layout.sidebar.content}>
                    <nav className={patterns.layout.sidebar.nav}>
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    router.push(item.path);
                                    if (isMobile) setIsSidebarOpen(false);
                                }}
                                className={`
                                    ${patterns.components.menuItem.base}
                                    ${pathname === item.path 
                                        ? patterns.components.menuItem.active 
                                        : patterns.components.menuItem.inactive}
                                `}
                            >
                                {/* Indicador de seleção */}
                                {pathname === item.path && (
                                    <div className={patterns.components.menuItem.indicator} />
                                )}

                                {/* Icon wrapper */}
                                <div className={pathname === item.path 
                                    ? patterns.components.menuItem.iconActive 
                                    : patterns.components.menuItem.iconInactive
                                }>
                                    {item.icon}
                                </div>

                                {!isCollapsed && (
                                    <span className={patterns.text.menuItem}>{item.title}</span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Bottom Menu */}
                <div className={patterns.layout.sidebar.footer}>
                    <div className={patterns.layout.sidebar.footerContent}>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={patterns.components.menuItem.base}
                        >
                            {isDarkMode ?
                                <Sun className={patterns.icon.size.md} /> :
                                <Moon className={patterns.icon.size.md} />
                            }
                            {!isCollapsed && (
                                <span className={patterns.text.menuItem}>
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
                                    ${patterns.components.menuItem.base}
                                    ${pathname === item.path 
                                        ? patterns.components.menuItem.active 
                                        : patterns.components.menuItem.inactive}
                                `}
                            >
                                {/* Indicador de seleção */}
                                {pathname === item.path && (
                                    <div className={patterns.components.menuItem.indicator} />
                                )}

                                {/* Icon wrapper */}
                                <div className={pathname === item.path 
                                    ? patterns.components.menuItem.iconActive 
                                    : patterns.components.menuItem.iconInactive
                                }>
                                    {item.icon}
                                </div>

                                {!isCollapsed && (
                                    <span className={patterns.text.menuItem}>{item.title}</span>
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