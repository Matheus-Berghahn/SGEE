"use server";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        equipamentos: true,
      },
    });
    return users.map(user => ({
      id: user.id,
      name: user.name,
      equipamentos: user.equipamentos
    }));
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const createEquipamento = async (
  nome: string,
  tipo: string,
  descricao: string,
  idUsuario: string | null 
) => {
  try {
    await prisma.equipamento.create({
      data: {
        nome,
        tipo,
        descricao,
        status: idUsuario ? 'em uso' : 'disponível', // Definindo o status com base no usuário
        user: idUsuario ? { connect: { id: parseInt(idUsuario) } } : undefined,
      },
    });
  } catch (error) {
    console.error('Erro ao criar equipamento:', error);
    throw error;
  }
};
