"use client";

import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { getEquipamentos, createEquipamento, updateEquipamento, deleteEquipamento } from './action';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';

interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  descricao: string;
  status: string;
  user?: User | null;
}

interface User {
  name: string;
}

const EquipamentoPage: React.FC = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [descricao, setDescricao] = useState<string>('');
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTipo, setModalTipo] = useState<'adicionar' | 'editar' | 'excluir'>('adicionar');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchEquipamentos = async () => {
    try {
      const data = await getEquipamentos();
      setEquipamentos(data || []);
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
    }
  };

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  // Função para abrir o modal para adicionar um novo equipamento
  const handleAddClick = () => {
    setModalTipo('adicionar');
    setShowModal(true);
  };

  // Função para abrir o modal para editar um equipamento
  const handleEditClick = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setDescricao(equipamento.descricao);
    setModalTipo('editar');
    setShowModal(true);
  };

  // Função para abrir o modal para excluir um equipamento
  const handleDeleteClick = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setModalTipo('excluir');
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEquipamentoSelecionado(null);
    setDescricao('');
  };

  // Função para salvar a edição do equipamento
  const handleSave = async () => {
    if (equipamentoSelecionado) {
      try {
        if (modalTipo === 'editar') {
          await updateEquipamento(equipamentoSelecionado.id, {
            nome: equipamentoSelecionado.nome,
            tipo: equipamentoSelecionado.tipo,
            descricao,
            status: equipamentoSelecionado.status,
          });
        } else if (modalTipo === 'adicionar') {
          await createEquipamento({
            nome: '',
            tipo: '',
            descricao,
            status: 'ativo',
          });
        } else if (modalTipo === 'excluir') {
          await deleteEquipamento(equipamentoSelecionado.id);
        }
        fetchEquipamentos();
        handleCloseModal();
      } catch (error) {
        console.error('Erro ao salvar equipamento:', error);
      }
    }
  };

  // Função para filtrar equipamentos com base no termo de pesquisa
  const filteredEquipamentos = equipamentos.filter((equipamento) =>
    equipamento.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className='w-[20%] h-full'></div>
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Equipamentos</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="border border-gray-300 p-2 pl-10 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
            />
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-200 p-4 text-left text-gray-700">Nome</th>
                <th className="border-b border-gray-200 p-4 text-left text-gray-700">Tipo</th>
                <th className="border-b border-gray-200 p-4 text-left text-gray-700">Status</th>
                <th className="border-b border-gray-200 p-4 text-left text-gray-700">Usuário</th>
                <th className="border-b border-gray-200 p-4 text-left text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipamentos.map((equipamento) => (
                <React.Fragment key={equipamento.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setEquipamentoSelecionado(equipamentoSelecionado?.id === equipamento.id ? null : equipamento)}>
                    <td className="border-b border-gray-200 p-4">{equipamento.nome}</td>
                    <td className="border-b border-gray-200 p-4">{equipamento.tipo}</td>
                    <td className="border-b border-gray-200 p-4">{equipamento.status}</td>
                    <td className="border-b border-gray-200 p-4">{equipamento.user?.name || 'N/A'}</td>
                    <td className="border-b border-gray-200 p-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditClick(equipamento); }}
                        className="text-blue-500 hover:text-blue-700 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteClick(equipamento); }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  {equipamentoSelecionado?.id === equipamento.id && (
                    <tr>
                      <td colSpan={5} className="border-b border-gray-200  p-4 bg-color3">
                        <p className="text-color-txt-2">{equipamento.descricao}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={
            modalTipo === 'adicionar'
              ? 'Adicionar Equipamento'
              : modalTipo === 'editar'
              ? 'Editar Equipamento'
              : 'Excluir Equipamento'
          }
        >
          {modalTipo === 'excluir' ? (
            <div>
              <p className="text-gray-800">
                Tem certeza de que deseja excluir o equipamento <strong>{equipamentoSelecionado?.nome}</strong>?
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                >
                  Confirmar Exclusão
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descrição:</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={4}
                  className="border border-gray-300 p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
              >
                {modalTipo === 'adicionar' ? 'Adicionar' : 'Salvar'}
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default EquipamentoPage;
