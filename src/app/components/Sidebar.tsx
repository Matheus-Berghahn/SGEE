'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaHome, FaBox, FaList, FaUsers, FaCog } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname(); // Para obter o caminho atual
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/fechar a sidebar no mobile

  // Função para verificar se o item está ativo
  const isActive = (path: string) => pathname === path;

  // Função para alternar a sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão de abrir/fechar a sidebar no mobile */}
      <div className="md:hidden fixed z-20 top-4 left-4">
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-color4 text-color-txt-1 z-10 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-[20%]`}>
        <div className="flex flex-col items-center py-6">
          <Image src="/logo_2.png" alt="Logo" width={120} height={120} className="rounded-xl" />
          <p className="mt-2 text-color-txt-1">Nome da Empresa</p>
          <p className="text-sm text-color-txt-1">email@empresa.com</p>
        </div>
        <div className="border-t border-color2 mx-5" />
        <div className="flex flex-col mt-14 gap-10 pl-5 py-5 flex-grow">
          <Link href="/">
            <div className={`flex items-center text-xl px-4 py-2 cursor-pointer ${isActive('/') ? 'bg-color2 text-color1 w-[90%] h-16 rounded-2xl' : ''}`}>
              <MdDashboard className="mr-3" />
              Dashboard
            </div>
          </Link>
          <Link href="/cadastro">
            <div className={`flex items-center text-xl px-4 py-2 cursor-pointer ${isActive('/cadastro') ? 'bg-color2 text-color1 w-[90%] h-16 rounded-2xl' : ''}`}>
              <FaBox className="mr-3" />
              Cadastro de Equipamentos
            </div>
          </Link>
          <Link href="/listagem">
            <div className={`flex items-center text-xl px-4 py-2 cursor-pointer ${isActive('/listagem') ? 'bg-color2 text-color1 w-[90%] h-16 rounded-2xl' : ''}`}>
              <FaList className="mr-3" />
              Lista de Equipamentos
            </div>
          </Link>
          <Link href="/usuarios">
            <div className={`flex items-center text-xl px-4 py-2 cursor-pointer ${isActive('/usuarios') ? 'bg-color2 text-color1 w-[90%] h-16 rounded-2xl' : ''}`}>
              <FaUsers className="mr-3" />
              Gerenciamento de Usuários
            </div>
          </Link>
          
          <Link href="/configuracoes">
            <div className={`flex items-center text-xl px-4 pt-2 cursor-pointer pb-2 ${isActive('/configuracoes') ? 'bg-color2 text-color1 w-[90%] h-16 rounded-2xl' : ''}`}>
              <FaCog className="mr-3" />
              Configurações
            </div>
          </Link>
        </div>
      </div>

      {/* Overlay para fechar a sidebar ao clicar fora no mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-5 md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
