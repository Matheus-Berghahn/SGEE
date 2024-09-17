"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tipo de Equipamento
interface EquipamentoData {
  nome: string;
  tipo: string;
  descricao: string;
  status: string;  // Adicionando status
}

// Função para obter equipamentos
export async function getEquipamentos() {
  try {
    const equipamentos = await prisma.equipamento.findMany();
    return equipamentos;
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error);
    throw new Error('Erro ao buscar equipamentos');
  }
}

// Função para criar um equipamento
export async function createEquipamento(data: EquipamentoData) {
  try {
    await prisma.equipamento.create({
      data: {
        nome: data.nome,
        tipo: data.tipo,
        descricao: data.descricao,
        status: data.status,  // Incluindo status
      },
    });
  } catch (error) {
    console.error('Erro ao criar equipamento:', error);
    throw new Error('Erro ao criar equipamento');
  }
}

// Função para atualizar um equipamento
export async function updateEquipamento(id: number, data: EquipamentoData) {
  try {
    await prisma.equipamento.update({
      where: { id },
      data: {
        nome: data.nome,
        tipo: data.tipo,
        descricao: data.descricao,
        status: data.status,  // Incluindo status
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    throw new Error('Erro ao atualizar equipamento');
  }
}

// Função para excluir um equipamento
export async function deleteEquipamento(id: number) {
  try {
    await prisma.equipamento.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Erro ao excluir equipamento:', error);
    throw new Error('Erro ao excluir equipamento');
  }
}
