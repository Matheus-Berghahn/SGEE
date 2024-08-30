"use client";

import { useEffect, useState } from 'react';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { getEquipamentos, deleteEquipamento, updateEquipamento } from './action';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';

interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  status: string;
  descricao: string;
}

const Equipamentos = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [equipamentoEditado, setEquipamentoEditado] = useState<Equipamento | null>(null);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [filtro, setFiltro] = useState<string>('');
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | null>(null);

  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        const equipamentosData = await getEquipamentos();
        setEquipamentos(equipamentosData);
      } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
      }
    };

    fetchEquipamentos();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEquipamentoEditado(null);
  };

  const handleOpenConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleEditEquipamento = async () => {
    if (!equipamentoEditado) return;

    try {
      await updateEquipamento(equipamentoEditado.id, equipamentoEditado.nome, equipamentoEditado.tipo, equipamentoEditado.status, equipamentoEditado.descricao);
      const equipamentosData = await getEquipamentos();
      setEquipamentos(equipamentosData);
      setEquipamentoEditado(null);
      handleCloseModal();
    } catch (err) {
      setError('Erro ao atualizar equipamento.');
      console.error('Erro ao atualizar equipamento:', err);
    }
  };

  const handleDeleteEquipamento = async () => {
    if (!equipamentoSelecionado) return;

    try {
      await deleteEquipamento(equipamentoSelecionado.id);
      const equipamentosData = await getEquipamentos();
      setEquipamentos(equipamentosData);
      setEquipamentoSelecionado(null);
      handleCloseConfirmDeleteModal();
    } catch (err) {
      setError('Erro ao excluir equipamento.');
      console.error('Erro ao excluir equipamento:', err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const equipamentosFiltrados = equipamentos.filter((equipamento) =>
    equipamento.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    equipamento.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSelectEquipamento = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setEquipamentoEditado(equipamento);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-4/5 px-20 py-8 bg-color2">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Gerenciamento de Equipamentos</h1>

        <div className="w-full flex justify-between items-center mb-6">
          <div className="relative w-2/3">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-color-txt-1" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou tipo..."
              value={filtro}
              onChange={handleSearch}
              className="w-full p-4 pl-12 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
            />
          </div>
        </div>

        <div className="w-full bg-color2 px-8 py-10 rounded-lg shadow-md shadow-color2opacity10 overflow-x-auto border-2 border-color1">
          <table className="w-full table-auto text-color-txt-1">
            <thead>
              <tr className="bg-color-txt-3 text-left">
                <th className="p-4">Nome</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Status</th>
                <th className="p-4">Descrição</th>
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
                  <td className="p-4">{equipamento.tipo}</td>
                  <td className="p-4">{equipamento.status}</td>
                  <td className="p-4">{equipamento.descricao}</td>
                  <td className="p-4">
                    <button
                      className="text-color-txt-2 hover:text-color-txt-1"
                      onClick={() => handleSelectEquipamento(equipamento)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-color-txt-2 hover:text-color-txt-1 ml-4"
                      onClick={() => {
                        setEquipamentoSelecionado(equipamento);
                        handleOpenConfirmDeleteModal();
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {equipamentoEditado && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Editar Equipamento"
          >
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Nome"
                value={equipamentoEditado.nome}
                onChange={(e) => setEquipamentoEditado({ ...equipamentoEditado, nome: e.target.value })}
                className="p-4 mb-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
              />
              <input
                type="text"
                placeholder="Tipo"
                value={equipamentoEditado.tipo}
                onChange={(e) => setEquipamentoEditado({ ...equipamentoEditado, tipo: e.target.value })}
                className="p-4 mb-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
              />
              <input
                type="text"
                placeholder="Status"
                value={equipamentoEditado.status}
                onChange={(e) => setEquipamentoEditado({ ...equipamentoEditado, status: e.target.value })}
                className="p-4 mb-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
              />
              <textarea
                placeholder="Descrição"
                value={equipamentoEditado.descricao}
                onChange={(e) => setEquipamentoEditado({ ...equipamentoEditado, descricao: e.target.value })}
                className="p-4 mb-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
              />
              <button
                onClick={handleEditEquipamento}
                className="p-4 rounded-lg bg-color-txt-1 text-white"
              >
                Salvar
              </button>
            </div>
          </Modal>
        )}

        {equipamentoSelecionado && (
          <Modal
            isOpen={isConfirmDeleteOpen}
            onClose={handleCloseConfirmDeleteModal}
            title="Confirmar Exclusão"
          >
            <p className="mb-4">Você tem certeza que deseja excluir o equipamento "{equipamentoSelecionado.nome}"?</p>
            <button
              onClick={handleDeleteEquipamento}
              className="p-4 rounded-lg bg-red-500 text-white"
            >
              Excluir
            </button>
            <button
              onClick={handleCloseConfirmDeleteModal}
              className="p-4 rounded-lg bg-gray-500 text-white ml-4"
            >
              Cancelar
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Equipamentos;
