'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBox, FaList, FaUsers, FaCog  } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname(); // Para obter o caminho atual

  // Função para verificar se o item está ativo
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex flex-col w-[20%] min-h-screen h-full bg-color4 text-color-txt-1 fixed z-10 top-0 left-0">
      <div className="flex flex-col items-center py-6">
        <Image src="/logo_2.png" alt="Logo" width={120} height={120} className="rounded-xl" />
        <p className="mt-2 text-color-txt-1">Nome da Empresa</p>
        <p className="text-sm text-color-txt-1">email@empresa.com</p>
      </div>
      <div className="border-t border-color2 mx-5" />
      <div className="flex flex-col mt-14 gap-10 pl-5 py-5 flex-grow">
        {/* <Link href="/">
          <div className={`flex items-center text-xl px-4 py-2 cursor-pointer ${isActive('/') ? 'bg-color2 text-color1 h-16 rounded-l-2xl' : ''}`}>
            <FaHome className="mr-3" />
            Home
          </div>
        </Link> */}
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
            <FaList className="mr-3 " />
            Lista de Equipamentos
          </div>
        </Link>
        <Link href="/usuarios">
          <div className={`flex items-center text-xl px-4 py-2 cursor-pointer ${isActive('/usuarios') ? 'bg-color2 text-color1 w-[90%] h-16 rounded-2xl' : ''}`}>
            <FaUsers className="mr-3" />
            Gerenciamento de Usuários
          </div>
        </Link>
        <div className="flex-grow" />
        <Link href="/configuracoes" >
          <div className={`flex items-center text-xl px-4 pt-2 cursor-pointer pb-2 ${isActive('/configuracoes') ? 'bg-color2 text-color1 w-[90%] h-16 rounded-2xl' : ''}`}>
            <FaCog className="mr-3" />
            Configurações
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
