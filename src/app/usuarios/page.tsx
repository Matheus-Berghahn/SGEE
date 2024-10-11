"use client";

import { useEffect, useState } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { createUser, getUsers, deleteUser, updateUser, getEquipamentosDisponiveis } from './action';
import { Equipamento as PrismaEquipamento } from '@prisma/client';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { useRouter } from "next/navigation";


interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
}

interface Usuario {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  equipamentos: Equipamento[];
  equipamentosCount: number;
}

const Usuarios = () => {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [equipamentosDisponiveis, setEquipamentosDisponiveis] = useState<Equipamento[]>([]);
  const [novoUsuario, setNovoUsuario] = useState<{ nome: string; email: string; equipamentos: number[] }>({ nome: '', email: '', equipamentos: [] });
  const [usuarioEditado, setUsuarioEditado] = useState<{ id: number; nome: string; email: string; equipamentos: number[] } | null>(null);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [filtro, setFiltro] = useState<string>('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const equipamentosDisponiveisParaAdicionar = equipamentosDisponiveis.filter(equipamento =>
    !usuarios.some(usuario => usuario.equipamentos.some(e => e.id === equipamento.id))
  );

  const equipamentosDoUsuarioSelecionado = usuarioSelecionado ? usuarioSelecionado.equipamentos.map(e => e) : [];

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsers();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    const fetchEquipamentos = async () => {
      try {
        const equipamentosData = await getEquipamentosDisponiveis();
        setEquipamentosDisponiveis(equipamentosData);
      } catch (error) {
        console.error('Erro ao buscar equipamentos disponíveis:', error);
      }
    };

    fetchUsuarios();
    fetchEquipamentos();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    router.refresh();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsuarioEditado(null);
    setNovoUsuario({ nome: '', email: '', equipamentos: [] });
    router.refresh();
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
      await createUser(novoUsuario.email, novoUsuario.nome, novoUsuario.equipamentos);
      const usuariosData = await getUsers();
      setUsuarios(usuariosData);
      setError('');
      handleCloseModal();
    } catch (err) {
      setError('Erro ao adicionar usuário.');
      console.error('Erro ao adicionar usuário:', err);
    }
    router.refresh();
  };

  const handleEditUsuario = async () => {
    if (!usuarioEditado) return;

    try {
      await updateUser(usuarioEditado.id, usuarioEditado.email, usuarioEditado.nome, usuarioEditado.equipamentos);
      const usuariosData = await getUsers();
      setUsuarios(usuariosData);
      setUsuarioEditado(null);
      handleCloseModal();
      router.refresh();
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
    router.refresh();
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
    setUsuarioEditado({
      id: usuario.id,
      nome: usuario.name,
      email: usuario.email,
      equipamentos: usuario.equipamentos.map(e => e.id),
    });
    router.refresh();
  };

  const handleSelectEquipamento = (equipamentoId: number) => {
    console.log(usuarioEditado)
    if (usuarioEditado) {
      setUsuarioEditado({
        ...usuarioEditado,
        equipamentos: usuarioEditado.equipamentos.includes(equipamentoId)
          ? usuarioEditado.equipamentos.filter(id => id !== equipamentoId)
          : [...usuarioEditado.equipamentos, equipamentoId]
      });
    } else {
      setNovoUsuario({
        ...novoUsuario,
        equipamentos: novoUsuario.equipamentos.includes(equipamentoId)
          ? novoUsuario.equipamentos.filter(id => id !== equipamentoId)
          : [...novoUsuario.equipamentos, equipamentoId]
      });
    }
  };

  // Filtra equipamentos disponíveis que não estão atribuídos a nenhum usuário



  return (
    <div className="flex">
      <Sidebar />
      
      <div className='w-[20%] h-full'></div>
      <div className="flex flex-col w-4/5 px-20 py-8 bg-color1">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Gerenciamento de Usuários</h1>

        <div className="w-full flex justify-between items-center mb-6">
          <div className="relative w-2/3">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-color-txt-1" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou email..."
              value={filtro}
              onChange={handleSearch}
              className="w-full p-4 pl-12 rounded-lg bg-color1 text-color-txt-1 border border-color-txt-3"
            />
          </div>
          <button
            className="flex items-center text-color-txt-2 bg-color2 hover:bg-color3 px-6 py-3 rounded-lg"
            onClick={() => { setUsuarioEditado(null); handleOpenModal(); }}
          >
            <FaUserPlus className="mr-2" />
            Adicionar
          </button>
        </div>

        <div className="w-full bg-color4 px-8 py-10 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-color2 p-4 text-left text-color-txt-1">Nome</th>
                <th className="border-b border-color2 p-4 text-left text-color-txt-1">Email</th>
                <th className="border-b border-color2 p-4 text-left text-color-txt-1">Data de Criação</th>
                <th className="border-b border-color2 p-4 text-left text-color-txt-1">Equipamentos</th>
                <th className="border-b border-color2 p-4 text-left text-color-txt-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map(usuario => (
                <tr
                  key={usuario.id}
                  className={`cursor-pointer rounded-b-2xl ${usuarioSelecionado?.id === usuario.id ? 'bg-color1 ' : ''}`}
                  onClick={() => handleSelectUsuario(usuario)}
                >
                  <td className="border-b border-color1 p-4 text-color-txt-1">{usuario.name}</td>
                  <td className="border-b border-color1 p-4 text-color-txt-1">{usuario.email}</td>
                  <td className="border-b border-color1 p-4 text-color-txt-1">{new Date(usuario.createdAt).toLocaleDateString()}</td>
                  <td className="border-b border-color1 p-4 text-color-txt-1">{usuario.equipamentosCount}</td>
                  <td className="border-b border-color1 p-4 text-color-txt-1">
                    {usuarioSelecionado?.id === usuario.id && (
                      <button
                      onClick={(e) => { e.stopPropagation(); setUsuarioEditado(usuarioEditado); handleOpenModal(); }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setUsuarioSelecionado(usuario); handleOpenConfirmDeleteModal(); }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {usuarioSelecionado && (
            <div className="mt-8 p-4 border border-color-txt-3 bg-color2 rounded-lg text-color-txt-2">
              <h3 className="text-xl text-color-txt-2 font-semibold mb-4">Equipamentos do Usuário</h3>
              <ul>
                {usuarioSelecionado.equipamentos.map(equipamento => (
                  <li key={equipamento.id} className="mb-2">
                    {equipamento.nome} - {equipamento.tipo}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={usuarioEditado ? 'Editar Usuário' : 'Adicionar Usuário'}
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nome"
              value={usuarioEditado ? usuarioEditado.nome : novoUsuario.nome}
              onChange={(e) => {
                if (usuarioEditado) {
                  setUsuarioEditado({ ...usuarioEditado, nome: e.target.value });
                } else {
                  setNovoUsuario({ ...novoUsuario, nome: e.target.value });
                }
              }}
              className="p-4 mb-4 rounded-lg bg-color1 text-color-txt-1 border border-color-txt-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={usuarioEditado ? usuarioEditado.email : novoUsuario.email}
              onChange={(e) => {
                if (usuarioEditado) {
                  setUsuarioEditado({ ...usuarioEditado, email: e.target.value });
                } else {
                  setNovoUsuario({ ...novoUsuario, email: e.target.value });
                }
              }}
              className="p-4 mb-4 rounded-lg bg-color1 text-color-txt-1 border border-color-txt-3"
            />
            <div className="mb-4 text-color-txt-1">
              <p className="text-color-txt-1 mb-2">Selecione Equipamentos:</p>
              {equipamentosDisponiveisParaAdicionar.map((equipamento) => (
                <label key={equipamento.id} className={`block mb-2 ${((usuarioEditado ? usuarioEditado.equipamentos : novoUsuario.equipamentos).includes(equipamento.id)) ? 'bg-color1 border-color2' : ''} p-2 rounded-lg`}>
                  <input
                    type="checkbox"
                    checked={(usuarioEditado ? usuarioEditado.equipamentos : novoUsuario.equipamentos).includes(equipamento.id)}
                    onChange={() => handleSelectEquipamento(equipamento.id)}
                    className="mr-2"
                  />
                  {equipamento.nome}
                </label>
              ))}
              
              {usuarioEditado && equipamentosDoUsuarioSelecionado.map((equipamento) => (
                <label key={equipamento.id} className={`block mb-2 ${((usuarioEditado ? usuarioEditado.equipamentos : novoUsuario.equipamentos).includes(equipamento.id)) ? 'bg-color1 border-color2' : ''} p-2 rounded-lg`}>
                  <input
                    type="checkbox"
                    checked={(usuarioEditado ? usuarioEditado.equipamentos : novoUsuario.equipamentos).includes(equipamento.id)}
                    onChange={() => handleSelectEquipamento(equipamento.id)}
                    className="mr-2"
                  />
                  {equipamento.nome}
                </label>
              ))}
            </div>
            <button
              onClick={usuarioEditado ? handleEditUsuario : handleAddUsuario}
              className="bg-color2  text-color-txt-2 px-4 py-2 rounded-lg"
            >
              {usuarioEditado ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isConfirmDeleteOpen}
          onClose={handleCloseConfirmDeleteModal}
          title="Confirmação"
        >
          <p className="mb-4 text-color-txt-4">Tem certeza de que deseja excluir este usuário?</p>

          <button
            onClick={handleDeleteUsuario}
            className="bg-red-500 hover:bg-red-600 text-color-txt-1 px-4 py-2 rounded-lg mr-5"
          >
            Excluir
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Usuarios;
