"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getEquipamentosDisponiveis() {
  try {
    const equipamentos = await prisma.equipamento.findMany({
      where: {
        user: null,
      },
    });
    return equipamentos;
  } catch (error) {
    console.error('Erro ao buscar equipamentos disponíveis:', error);
    throw new Error('Erro ao buscar equipamentos disponíveis');
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        equipamentos: true,
      },
    });
    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      equipamentosCount: user.equipamentos.length,
      equipamentos: user.equipamentos.map(equipamento => ({
        id: equipamento.id,
        nome: equipamento.nome,
        tipo: equipamento.tipo,
      })),
    }));
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw new Error('Erro ao buscar usuários');
  }
}

export async function createUser(email: string, name: string, equipamentosIds: number[]) {
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        equipamentos: {
          connect: equipamentosIds.map(id => ({ id })),
        },
      },
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Erro ao criar usuário');
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw new Error('Erro ao excluir usuário');
  }
}

export async function updateUser(id: number, email: string, name: string, equipamentosIds: number[]) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        equipamentos: {
          set: equipamentosIds.map(id => ({ id })),
        },
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw new Error('Erro ao atualizar usuário');
  }
}