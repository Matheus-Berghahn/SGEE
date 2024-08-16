'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

interface Equipamento {
  id: string;
  nome: string;
  tipo: string;
  usuario: string;
  status: string;
  descricao: string;
}

const equipamentosIniciais: Equipamento[] = [
  {
    id: '001',
    nome: 'Notebook Dell',
    tipo: 'Notebook',
    usuario: 'Carlos Silva',
    status: 'Em uso',
    descricao: 'Notebook Dell Inspiron 15 3000',
  },
  {
    id: '002',
    nome: 'Impressora HP',
    tipo: 'Impressora',
    usuario: 'Maria Souza',
    status: 'Disponível',
    descricao: 'Impressora HP LaserJet Pro M404',
  },
  // Adicione mais itens conforme necessário
];

const ListaEquipamentos = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>(equipamentosIniciais);
  const [filtro, setFiltro] = useState<string>('');
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const equipamentosFiltrados = equipamentos.filter((equipamento) =>
    equipamento.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    equipamento.id.toLowerCase().includes(filtro.toLowerCase()) ||
    equipamento.usuario.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSelectEquipamento = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center items-center flex-col w-4/5 px-20 bg-color2">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Lista de Equipamentos</h1>
        
        <div className="w-full flex justify-center mb-6">
          <div className="relative w-2/3">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-color-txt-1" />
            <input
              type="text"
              placeholder="Pesquisar por nome, ID ou usuário..."
              value={filtro}
              onChange={handleSearch}
              className="w-full p-4 pl-12 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
            />
          </div>
        </div>

        <div className="w-full bg-color2 px-8 py-10 rounded-lg shadow-xl shadow-color2opacity10 overflow-x-auto">
          <table className="w-full table-auto text-color-txt-1">
            <thead>
              <tr className="bg-color-txt-3 text-left">
                <th className="p-4">Nome do Equipamento</th>
                <th className="p-4">ID</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Usuário</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentosFiltrados.map((equipamento) => (
                <tr
                  key={equipamento.id}
                  className={`cursor-pointer ${
                    equipamentoSelecionado?.id === equipamento.id 
                      ? 'bg-color3 text-color-txt-2'
                      : 'hover:bg-color-txt-3 text-color-txt-1'
                  }`}
                  onClick={() => handleSelectEquipamento(equipamento)}
                >
                  <td className="p-4">{equipamento.nome}</td>
                  <td className="p-4">{equipamento.id}</td>
                  <td className="p-4">{equipamento.tipo}</td>
                  <td className="p-4">{equipamento.usuario}</td>
                  <td className="p-4">{equipamento.status}</td>
                  <td className="p-4 flex gap-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 px-6 pt-6 pb-20 bg-color2 w-full rounded-lg border border-color-txt-3 shadow-xl shadow-color2opacity10">
          <h2 className="text-xl font-bold text-color-txt-1 mb-4">Descrição do Equipamento</h2>
          <p className="text-color-txt-1 mb-4">
            {equipamentoSelecionado
              ? equipamentoSelecionado.descricao
              : 'Selecione um equipamento para ver a descrição.'}
          </p>
          {equipamentoSelecionado && (
            <p className="text-color-txt-1">
              <strong>ID:</strong> {equipamentoSelecionado.id}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaEquipamentos;
