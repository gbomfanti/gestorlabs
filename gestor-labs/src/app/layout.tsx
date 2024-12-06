'use client';

import localFont from "next/font/local";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import "./globals.css";
import { PageProvider, usePage } from '@/contexts/PageContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

const geistSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Componente para gerenciar a atualização do título
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { updatePageFromPath } = usePage();

  useEffect(() => {
    updatePageFromPath(pathname);
  }, [pathname, updatePageFromPath]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto min-h-screen">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Componente principal do layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PageProvider>
          <LayoutContent>{children}</LayoutContent>
        </PageProvider>
      </body>
    </html>
  );
}