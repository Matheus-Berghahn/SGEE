import { Equipamento } from '@prisma/client';

const API_URL = '/api/equipamentos'; // Altere conforme necessário

export const createEquipamento = async (nome: string, tipo: string, status: string, descricao: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, tipo, status, descricao }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar equipamento.');
    }
  } catch (error) {
    console.error('Erro ao criar equipamento:', error);
    throw error;
  }
};

export const getEquipamentos = async (): Promise<Equipamento[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Erro ao buscar equipamentos.');
    }

    return response.json();
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error);
    throw error;
  }
};

export const updateEquipamento = async (id: number, nome: string, tipo: string, status: string, descricao: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, tipo, status, descricao }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar equipamento.');
    }
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    throw error;
  }
};

export const deleteEquipamento = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir equipamento.');
    }
  } catch (error) {
    console.error('Erro ao excluir equipamento:', error);
    throw error;
  }
};
