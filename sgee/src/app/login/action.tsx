"use server"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAdm(email: string, password: string) {
  try {
    const adm = await prisma.adm.findUnique({
      where: {
        email: email,
      },
    });

    // Verifica se o administrador existe e se a senha é correta
    if (adm && adm.password === password) {
      return adm;
    } else {
      throw new Error('Credenciais inválidas');
    }
  } catch (error) {
    throw new Error('Erro ao buscar administrador');
  }
}
