"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar } from 'lucide-react';

const ProfilePage = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Título da Página com Ícone e Botão de Editar Perfil */}
            <div className="flex items-center justify-between">
                <Button className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
                    Editar Perfil
                </Button>
            </div>

            {/* Card com informações do perfil */}
            <Card className="bg-white rounded-lg shadow-sm flex items-center min-h-[250px]">
                <CardContent className="space-y-6 flex flex-col justify-center">
                    <div className="flex items-center space-x-3">
                        <Mail className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-base font-medium text-gray-800">johndoe@example.com</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <User className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Nome</p>
                            <p className="text-base font-medium text-gray-800">John Doe</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Calendar className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Data de Cadastro</p>
                            <p className="text-base font-medium text-gray-800">01/01/2024</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
