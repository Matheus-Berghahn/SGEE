"use client";

import { useEffect, useState } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { createUser, getUsers, deleteUser, updateUser } from './action';
import { User } from '@prisma/client';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';

interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
}

interface Usuario {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  equipamentosCount: number;
  equipamentos: Equipamento[];
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [novoUsuario, setNovoUsuario] = useState<{ nome: string; email: string }>({ nome: '', email: '' });
  const [usuarioEditado, setUsuarioEditado] = useState<{ id: number; nome: string; email: string } | null>(null);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [filtro, setFiltro] = useState<string>('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsers();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsuarioEditado(null);
  };

  const handleOpenConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleAddUsuario = async () => {
    if (!novoUsuario.nome || !novoUsuario.email) {
      setError('Nome e Email são obrigatórios.');
      return;
    }

    try {
      await createUser(novoUsuario.email, novoUsuario.nome, []); // Passe os IDs dos equipamentos se necessário
      const usuariosData = await getUsers();
      setUsuarios(usuariosData);
      setNovoUsuario({ nome: '', email: '' });
      setError('');
      handleCloseModal();
    } catch (err) {
      setError('Erro ao adicionar usuário.');
      console.error('Erro ao adicionar usuário:', err);
    }
  };

  const handleEditUsuario = async () => {
    if (!usuarioEditado) return;

    try {
      await updateUser(usuarioEditado.id, usuarioEditado.email, usuarioEditado.nome);
      const usuariosData = await getUsers();
      setUsuarios(usuariosData);
      setUsuarioEditado(null);
      handleCloseModal();
    } catch (err) {
      setError('Erro ao atualizar usuário.');
      console.error('Erro ao atualizar usuário:', err);
    }
  };

  const handleDeleteUsuario = async () => {
    if (!usuarioSelecionado) return;

    try {
      await deleteUser(usuarioSelecionado.id);
      const usuariosData = await getUsers();
      setUsuarios(usuariosData);
      setUsuarioSelecionado(null);
      handleCloseConfirmDeleteModal();
    } catch (err) {
      setError('Erro ao excluir usuário.');
      console.error('Erro ao excluir usuário:', err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(filtro.toLowerCase()) ||
    usuario.email.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSelectUsuario = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setUsuarioEditado({ id: usuario.id, nome: usuario.name, email: usuario.email });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-4/5 px-20 py-8 bg-color2">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Gerenciamento de Usuários</h1>

        <div className="w-full flex justify-between items-center mb-6">
          <div className="relative w-2/3">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-color-txt-1" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou email..."
              value={filtro}
              onChange={handleSearch}
              className="w-full p-4 pl-12 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
            />
          </div>
          <button
            className="flex items-center text-color-txt-2 bg-color3 hover:bg-color4 px-6 py-3 rounded-lg"
            onClick={handleOpenModal}
          >
            <FaUserPlus className="mr-2" />
            Adicionar
          </button>
        </div>

        <div className="w-full bg-color2 px-8 py-10 rounded-lg shadow-md shadow-color2opacity10 overflow-x-auto border-2 border-color1">
          <table className="w-full table-auto text-color-txt-1">
            <thead>
              <tr className="bg-color-txt-3 text-left">
                <th className="p-4">Nome</th>
                <th className="p-4">Email</th>
                <th className="p-4">Total de Equipamentos</th>
                <th className="p-4">Data de Criação</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr
                  key={usuario.id}
                  className={`cursor-pointer ${
                    usuarioSelecionado?.id === usuario.id
                      ? 'bg-color3 text-color-txt-2'
                      : 'hover:bg-color-txt-3 text-color-txt-1'
                  }`}
                  onClick={() => handleSelectUsuario(usuario)}
                >
                  <td className="p-4">{usuario.name}</td>
                  <td className="p-4">{usuario.email}</td>
                  <td className="p-4">{usuario.equipamentosCount}</td>
                  <td className="p-4">{new Date(usuario.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button
                      className="text-color-txt-2 hover:text-color-txt-1"
                      onClick={() => handleSelectUsuario(usuario)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-color-txt-2 hover:text-color-txt-1 ml-4"
                      onClick={() => {
                        setUsuarioSelecionado(usuario);
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

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={usuarioEditado ? 'Editar Usuário' : 'Adicionar Usuário'}
        >
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nome"
              value={usuarioEditado?.nome || novoUsuario.nome}
              onChange={(e) =>
                usuarioEditado
                  ? setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })
                  : setNovoUsuario({ ...novoUsuario, nome: e.target.value })
              }
              className="p-4 mb-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={usuarioEditado?.email || novoUsuario.email}
              onChange={(e) =>
                usuarioEditado
                  ? setUsuarioEditado({ ...usuarioEditado, email: e.target.value })
                  : setNovoUsuario({ ...novoUsuario, email: e.target.value })
              }
              className="p-4 mb-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
            />
            <div className="flex justify-end">
              <button
                onClick={usuarioEditado ? handleEditUsuario : handleAddUsuario}
                className="bg-color3 hover:bg-color4 text-color-txt-2 px-6 py-3 rounded-lg"
              >
                {usuarioEditado ? 'Salvar Alterações' : 'Adicionar'}
              </button>
            </div>
          </div>
        </Modal>

        {isConfirmDeleteOpen && usuarioSelecionado && (
          <Modal
            isOpen={isConfirmDeleteOpen}
            onClose={handleCloseConfirmDeleteModal}
            title="Confirmação de Exclusão"
          >
            <p className="mb-4">Tem certeza de que deseja excluir o usuário {usuarioSelecionado.name}?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteUsuario}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Excluir
              </button>
              <button
                onClick={handleCloseConfirmDeleteModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg ml-4"
              >
                Cancelar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
