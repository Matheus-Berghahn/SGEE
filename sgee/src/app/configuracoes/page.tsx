'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Tema {
  nome: string;
  cores: {
    background: string;
    texto: string;
    borda: string;
  };
}

const temas: Tema[] = [
  {
    nome: 'Tema Escuro',
    cores: {
      background: '#1D1D1D',
      texto: '#FFFFFF',
      borda: '#0A689D'
    }
  },
  {
    nome: 'Tema Claro',
    cores: {
      background: '#FFFFFF',
      texto: '#000000',
      borda: '#FFE381'
    }
  },
  {
    nome: 'Tema Azul',
    cores: {
      background: '#0A689D',
      texto: '#FFFFFF',
      borda: '#84b3ce'
    }
  }
];

const Configuracoes = () => {
  const [temaSelecionado, setTemaSelecionado] = useState<Tema>(temas[0]);
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

  const handleTemaChange = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    const temaSelecionado = temas.find(tema => tema.nome === evento.target.value);
    if (temaSelecionado) {
      setTemaSelecionado(temaSelecionado);
      // Aplicar o tema à interface
      document.body.style.backgroundColor = temaSelecionado.cores.background;
      document.body.style.color = temaSelecionado.cores.texto;
      document.body.style.borderColor = temaSelecionado.cores.borda;
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center items-center flex-col w-4/5 px-20 bg-color2">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Configurações</h1>

        <div className="w-full bg-color2 px-6 py-4 rounded-lg shadow-md shadow-color2opacity10 mb-6 flex items-center gap-4">
          <img src="/path/to/banner-image.jpg" alt="Banner" className="w-1/4 h-auto rounded-lg" />
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-color-txt-1">Seu Nome</h2>
            <p className="text-color-txt-1">seunome@exemplo.com</p>
            <div className="relative mt-4">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Senha"
                className="p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full bg-color2 px-6 py-4 rounded-lg shadow-md shadow-color2opacity10">
          <h2 className="text-xl font-bold text-color-txt-1 mb-4">Configurações de Tema</h2>
          <select
            onChange={handleTemaChange}
            value={temaSelecionado.nome}
            className="p-2 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
          >
            {temas.map((tema) => (
              <option key={tema.nome} value={tema.nome}>
                {tema.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
