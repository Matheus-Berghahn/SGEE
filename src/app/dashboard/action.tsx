"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para contar os equipamentos agrupados por tipo
export async function getEquipamentosPorTipo() {
  try {
    const equipamentos = await prisma.equipamento.groupBy({
      by: ['tipo'],
      _count: {
        tipo: true,
      },
    });
    return equipamentos;
  } catch (error) {
    console.error(`Erro ao buscar tipos de equipamentos:`, error);
    throw new Error(`Erro ao buscar tipos de equipamentos`);
  }
}

// Função para contar o total de equipamentos
export async function getTotalEquipamentos() {
  try {
    const total = await prisma.equipamento.count();
    return total;
  } catch (error) {
    console.error('Erro ao buscar total de equipamentos:', error);
    throw new Error('Erro ao buscar total de equipamentos');
  }
}

// Função para contar os equipamentos que estão em uso (status "em uso")
export async function getEquipamentosEmUso() {
  try {
    const totalEmUso = await prisma.equipamento.count({
      where: {
        status: 'em uso',
      },
    });
    return totalEmUso;
  } catch (error) {
    console.error('Erro ao buscar equipamentos em uso:', error);
    throw new Error('Erro ao buscar equipamentos em uso');
  }
}

// Função para contar o total de usuários
export async function getTotalUsuarios() {
  try {
    const total = await prisma.user.count();
    return total;
  } catch (error) {
    console.error('Erro ao buscar total de usuários:', error);
    throw new Error('Erro ao buscar total de usuários');
  }
}
