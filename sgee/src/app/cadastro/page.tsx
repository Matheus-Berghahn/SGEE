'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const CadastroEquipamento = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  const isFormValid = nome && tipo && descricao;

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex justify-center items-center flex-col w-4/5 p-6 bg-color2">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Cadastrar Equipamento</h1>
        <div className="w-5/6 bg-color2 p-8 rounded-lg shadow-md shadow-color2opacity10 border-2 border-color1">
          <div className="flex flex-col gap-6 mb-6">
            <div>
              <label htmlFor="nome" className="block text-color-txt-1 text-lg mb-2">Nome:</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3 placeholder-color2opacity20"
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
                  className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3"
                >
                  <option value="" disabled>Selecione o tipo</option>
                  <option value="notebook">Notebook</option>
                  <option value="impressora">Impressora</option>
                  <option value="monitor">Monitor</option>
                  <option value="cadeira">Cadeira</option>
                  <option value="webcam">Webcam</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="idUsuario" className="block text-color-txt-1 text-lg mb-2">ID do Usuário:</label>
              <input
                id="idUsuario"
                type="text"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}
                className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3 placeholder-color2opacity20"
                placeholder="ID do usuário (opcional)"
              />
            </div>
            <div>
              <label htmlFor="descricao" className="block text-color-txt-1 text-lg mb-2">Descrição:</label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full p-4 rounded-lg bg-color2 text-color-txt-1 border border-color-txt-3 placeholder-color2opacity20"
                placeholder="Descrição do equipamento"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              disabled={!isFormValid}
              className={`px-6 py-3 rounded-lg font-bold text-color bg-color2 border-2 border-color2opacity20   ${
                isFormValid ? ' hover:bg-color3 hover:border-color3 hover:text-color-txt-2 ' : 'bg-color2 opacity-50 border-2 border-color2opacity20  '
              }`}
              title={!isFormValid ? 'Preencha todos os campos obrigatórios' : ''}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroEquipamento;
