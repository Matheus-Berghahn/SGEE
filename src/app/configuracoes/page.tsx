'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Configuracoes = () => {
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
  const [senha, setSenha] = useState<string>('adm123'); // Preenchendo com a senha padrão
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className='w-[20%] h-full'></div>
      <div className="flex justify-start pt-[5%] items-center flex-col w-4/5 px-20 bg-color1 ">
        <h1 className="text-6xl font-bold text-center mb-10 text-color-txt-1">Configurações</h1>

        <div className="w-4/6 bg-color4 px-6 py-4 rounded-lg mb-6 flex items-center gap-4 shadow-md shadow-color2opacity10 border-2 border-color1">
          <img src="/logo.png" alt="Banner" className="w-1/5 h-auto rounded-lg bg-white border-2 border-color4 p-6" />
          <div className="flex flex-col">
            <h2 className="text-5xl font-bold text-color-txt-1">nomedaempresa</h2>
            <p className="text-color-txt-1">emailempresa@exemplo.com</p>
            <div className="relative mt-4">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha} // Adicionando o valor da senha
                placeholder="Senha"
                className="p-2 rounded-lg bg-color4 text-color-txt-1 border border-color-txt-1"
                readOnly
              />
              <button
                type="button"
                className="absolute pl-5 top-1/2 transform -translate-y-1/2 text-color2"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="w-4/6 bg-color4 px-6 py-4 rounded-lg mb-6 flex flex-col gap-4 shadow-md shadow-color2opacity10 border-2 border-color1">
          <h3 className="text-3xl font-semibold text-color-txt-1">Tema</h3>
          <div className="flex gap-4">
            <button
              onClick={() => changeTheme('light')}
              className={`py-2 px-4 rounded-lg border-2 bg-color1 text-color-txt-1 ${theme === 'light' ? 'border-color2' : 'border-color4'}`}
            >
              Light
            </button>
            <button
              onClick={() => changeTheme('dark')}
              className={`py-2 px-4 rounded-lg border-2 bg-color1 text-color-txt-1 ${theme === 'dark' ? 'border-color2' : 'border-color4'}`}
            >
              Dark
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Configuracoes;
