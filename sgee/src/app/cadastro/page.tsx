'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { createEquipamento, getUsers } from './action';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usuarios, setUsuarios] = useState<{ id: number; name: string; equipamentos: any[] }[]>([]);

  const tiposPermitidos = ["NOTEBOOK", "IMPRESSORA", "MONITOR", "CADEIRA", "WEBCAM"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsuarios(users);
      } catch (error) {
        console.log('Erro ao buscar usuários:', error);
        setError('Erro ao buscar usuários. Por favor, tente novamente.');
      }
    };
    fetchUsers();
  }, []);

  const isFormValid = nome && tipo && descricao;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!tiposPermitidos.includes(tipo.toUpperCase())) {
      setError('Tipo de equipamento inválido. Selecione uma opção válida.');
      return;
    }

    try {
      await createEquipamento(nome, tipo.toUpperCase(), descricao, idUsuario || null); // Envia null se nenhum usuário for selecionado
      setSuccess('Equipamento cadastrado com sucesso!');
      setNome('');
      setTipo('');
      setDescricao('');
      setIdUsuario('');
    } catch (error) {
      setError('Erro ao cadastrar equipamento. Por favor, tente novamente.');
      console.log(error);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-start pt-[5%] items-center flex-col w-4/5 p-6 bg-color2">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Cadastrar Equipamento</h1>
        <div className="w-5/6 bg-color2 p-8 rounded-lg shadow-md shadow-color2opacity10 border-2 border-color1">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-800 border border-red-300 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded-md">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 mb-6">
              <div>
                <label htmlFor="nome" className="block text-color-txt-1 text-lg mb-2">Nome:</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-1 placeholder-color-txt-1"
                  placeholder="Nome do equipamento"
                />
              </div>
              <div>
                <label htmlFor="tipo" className="block text-color-txt-1 text-lg mb-2">Tipo de Equipamento:</label>
                <div className="select-container">
                  <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-1"
                  >
                    <option value="" disabled>Selecione o tipo</option>
                    {tiposPermitidos.map((tipoOption) => (
                      <option key={tipoOption} value={tipoOption}>
                        {tipoOption.charAt(0) + tipoOption.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="idUsuario" className="block text-color-txt-1 text-lg mb-2">Usuário:</label>
                <div className="select-container">
                  <select
                    id="idUsuario"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                    className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-1"
                  >
                    <option value="">Selecione um usuário (opcional)</option>
                    {usuarios.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} (ID: {user.id}) - {user.equipamentos.length} equipamentos
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="descricao" className="block text-color-txt-1 text-lg mb-2">Descrição:</label>
                <textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-1 placeholder-color-txt-1"
                  placeholder="Descrição do equipamento"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-6 py-3 rounded-lg font-bold text-color-txt-1 bg-color2 border-2 border-color1 ${
                  isFormValid ? 'hover:bg-color3 hover:border-color3 hover:text-color-txt-2' : 'opacity-50 border-color2opacity20'
                }`}
                title={!isFormValid ? 'Preencha todos os campos obrigatórios' : ''}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
