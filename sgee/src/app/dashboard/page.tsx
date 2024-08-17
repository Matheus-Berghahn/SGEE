'use client';

import { useEffect } from 'react';
import { Bounce, gsap } from 'gsap';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  useEffect(() => {
    gsap.fromTo('.animopacity', 
      { opacity: 0,  }, 
      { opacity: 1, duration: 1, stagger: 0.5 }
    );

    gsap.fromTo('.card', 
      { opacity: 0, scale: 0.6 }, 
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.9, stagger: 0.2}
    );

    gsap.fromTo('.card2', 
      { opacity: 0, y: 60 }, 
      { opacity: 1, y: 0, duration: 1,  delay: 0.8,}
    );
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full bg-color2">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Modais de Resumo */}
        <div className="flex gap-6 mb-6">
          <div className="card w-1/4 bg-color2 rounded-lg p-16 shadow-xl shadow-color2opacity10 relative border-2 border-color1">
            <p className="text-8xl font-bold text-center text-color-txt-1">28</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-1">Total de Equipamentos</p>
          </div>
          <div className="card w-1/4 bg-color2 rounded-lg p-16 shadow-xl shadow-color2opacity10 relative border-2 border-color1">
            <p className="text-7xl font-bold text-center text-color-txt-1">24</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-1">Equipamentos Sendo Usados</p>
          </div>
          <div className="card w-2/4 bg-color2 rounded-lg p-16 shadow-xl shadow-color2opacity10 relative border-2 border-color1">
            <p className="text-7xl font-bold text-center text-color-txt-1">16/08/2024</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-1">Última Atualização do Sistema</p>
          </div>
        </div>

        {/* Modais de Detalhe */}
        <div className="animopacity bg-color2 rounded-lg p-6 shadow-lg shadow-color2opacity10 mb-6 border-2 border-color1">
          <div className="flex gap-6">
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Notebooks</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">10</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Impressoras</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">3</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Monitores</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">5</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Cadeiras</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">12</p>
            </div>
            <div className="flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Webcams</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">7</p>
            </div>
          </div>
        </div>

        {/* Informações de Usuários */}
        <div className="card2 bg-color1 rounded-lg p-6 shadow-lg shadow-color2opacity10 flex h-[370px]">
          <div className="w-1/2 text-center flex justify-between flex-col">
            <p className="text-4xl font-bold text-color2">Total de Usuários</p>
            <p className="text-[180px] font-bold text-color2">10</p>
          </div>
          <div className="w-1/2">
            <img src="/img_faces.jpg" alt="Imagem de Usuários" className="w-full h-full object-cover rounded-lg border-2 border-color2 grayscale" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
