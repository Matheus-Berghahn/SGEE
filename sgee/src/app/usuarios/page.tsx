'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { FaSearch, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  equipamentos: string[];
}

const usuariosIniciais: Usuario[] = [
  {
    id: '001',
    nome: 'Carlos Silva',
    email: 'carlos@empresa.com',
    equipamentos: ['Notebook Dell', 'Impressora HP'],
  },
  {
    id: '002',
    nome: 'Maria Souza',
    email: 'maria@empresa.com',
    equipamentos: ['Monitor Samsung'],
  },
  // Adicione mais usuários conforme necessário
];

const GerenciamentoUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciais);
  const [filtro, setFiltro] = useState<string>('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [novoUsuario, setNovoUsuario] = useState<Omit<Usuario, 'equipamentos'>>({
    id: '',
    nome: '',
    email: '',
  });
  const [equipamentoIds, setEquipamentoIds] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    usuario.id.toLowerCase().includes(filtro.toLowerCase()) ||
    usuario.email.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSelectUsuario = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.email) {
      setError('Nome e Email são obrigatórios.');
      return;
    }

    const equipamentosArray = equipamentoIds
      .split(',')
      .map(id => id.trim())
      .filter(id => id); // Remove IDs vazios

    const novoUsuarioComEquipamentos = {
      ...novoUsuario,
      id: (usuarios.length + 1).toString(), // Gerar um ID simples
      equipamentos: equipamentosArray,
    };

    setUsuarios([...usuarios, novoUsuarioComEquipamentos as Usuario]);
    handleCloseModal();
    // Reset form
    setNovoUsuario({ id: '', nome: '', email: '' });
    setEquipamentoIds('');
    setError('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center items-center flex-col w-4/5 px-20 bg-color2">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Gerenciamento de Usuários</h1>

        <div className="w-full flex justify-between items-center mb-6">
          <div className="relative w-2/3">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-color-txt-1" />
            <input
              type="text"
              placeholder="Pesquisar por nome, ID ou email..."
              value={filtro}
              onChange={handleSearch}
              className="w-full p-4 pl-12 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
            />
          </div>
          <button
            className="flex items-center text-white bg-color3 hover:bg-color3 px-6 py-3 rounded-lg"
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
                <th className="p-4">Nome do Usuário</th>
                <th className="p-4">ID</th>
                <th className="p-4">Email</th>
                <th className="p-4">Equipamentos Registrados</th>
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
                  <td className="p-4">{usuario.nome}</td>
                  <td className="p-4">{usuario.id}</td>
                  <td className="p-4">{usuario.email}</td>
                  <td className="p-4">{usuario.equipamentos.length}</td>
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

        <div className="mt-6 px-6 pt-6 pb-20 bg-color2 w-full rounded-lg shadow-md shadow-color2opacity10 border-2 border-color1">
          <h2 className="text-xl font-bold text-color-txt-1 mb-4">Equipamentos do Usuário</h2>
          <p className="text-color-txt-1 mb-4">
            {usuarioSelecionado
              ? `Equipamentos registrados: ${usuarioSelecionado.equipamentos.join(', ')}`
              : 'Selecione um usuário para ver os detalhes.'}
          </p>
          {usuarioSelecionado && (
            <p className="text-color-txt-1">
              <strong>ID:</strong> {usuarioSelecionado.id}
            </p>
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Adicionar Usuário">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome do Usuário"
              value={novoUsuario.nome}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
              className="p-4 rounded-lg border border-color-txt-3"
            />
            <input
              type="email"
              placeholder="Email do Usuário"
              value={novoUsuario.email}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
              className="p-4 rounded-lg border border-color-txt-3"
            />
            <input
              type="text"
              placeholder="IDs dos Equipamentos (separados por vírgula)"
              value={equipamentoIds}
              onChange={(e) => setEquipamentoIds(e.target.value)}
              className="p-4 rounded-lg border border-color-txt-3"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={handleAddUsuario}
            >
              Adicionar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GerenciamentoUsuarios;
