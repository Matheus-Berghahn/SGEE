// src/app/dashboard/page.tsx

import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center  w-full h-full ">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Modais de Resumo */}
        <div className="flex gap-6 mb-6">
          <div className="w-1/4 bg-color1 rounded-lg p-16 shadow-xl shadow-color2opacity20 relative">
            <p className="text-8xl font-bold text-center text-color2">28</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-2">Total de Equipamentos</p>
          </div>
          <div className="w-1/4 bg-color1 rounded-lg p-16 shadow-xl shadow-color2opacity20 relative">
            <p className="text-7xl font-bold text-center text-color2">24</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-2">Equipamentos Sendo Usados</p>
          </div>
          <div className="w-2/4 bg-color1 rounded-lg p-16 shadow-xl shadow-color2opacity20 relative">
            <p className="text-7xl font-bold text-center text-color2">16/08/2024</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-2">Última Atualização do Sistema</p>
          </div>
        </div>

        {/* Modais de Detalhe */}
        <div className="bg-color1 rounded-lg p-6 shadow-lg shadow-color2opacity20 mb-6">
          <div className="flex gap-6">
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color2">Notebooks</p>
              <p className="text-5xl pb-5 font-bold text-color2">10</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color2">Impressoras</p>
              <p className="text-5xl pb-5 font-bold text-color2">3</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color2">Monitores</p>
              <p className="text-5xl pb-5 font-bold text-color2">5</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color2">Cadeiras</p>
              <p className="text-5xl pb-5 font-bold text-color2">12</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color2">Webcams</p>
              <p className="text-5xl pb-5 font-bold text-color2">7</p>
            </div>
          </div>
        </div>

        {/* Informações de Usuários */}
        <div className="bg-color1 rounded-lg p-6 shadow-lg shadow-color2opacity20 flex h-[370px]">
          <div className="w-1/2 text-center flex justify-between flex-col">
            <p className="text-4xl font-bold text-color2">Total de Usuários</p>
            <p className="text-[180px] font-bold text-color2">10</p>
          </div>
          <div className="w-1/2">
            <img src="/img_faces.jpg" alt="Imagem de Usuários" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
