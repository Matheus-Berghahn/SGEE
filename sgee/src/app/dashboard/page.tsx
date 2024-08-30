'use client';

import { useEffect } from 'react';
import { Bounce, gsap } from 'gsap';
import Sidebar from '../components/Sidebar';


const Dashboard = () => {
  useEffect(() => {
    // Criação da timeline GSAP
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Seleção dos cards
    const cards = document.querySelectorAll('.card');

    // Adicionando animação para cada card
    cards.forEach((card, index) => {
      tl.fromTo(
        card,
        { scale: 1 },
        {
          scale: 1.03,
          duration: 0.5,
          ease: 'easeInOut',
          stagger: 1,
          yoyo: true,
          repeat: 1,
        }
      );
    });
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full bg-color2">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Modais de Resumo */}
        <div className="flex gap-6 mb-6">
          <div className="card w-1/4 bg-color2 rounded-lg p-16 relative shadow-xl shadow-color2opacity10  border-2 border-color1">
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
        <div className=" bg-color2 rounded-lg p-6 shadow-lg shadow-color2opacity10 mb-6 border-2 border-color1">
          <div className="flex gap-6">
            <div className="card flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Notebooks</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">10</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Impressoras</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">3</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Monitores</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">5</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Cadeiras</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">12</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-1/5 rounded-lg bg-color1">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Webcams</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">7</p>
            </div>
          </div>
        </div>

        {/* Informações de Usuários */}
        <div className="card  bg-color1 rounded-lg p-6 shadow-lg shadow-color2opacity10 flex h-[370px]">
          <div className="w-1/2 text-center flex justify-between flex-col">
            <p className="text-4xl font-bold text-color-txt-2">Total de Usuários</p>
            <p className="text-[180px] font-bold text-color-txt-2">10</p>
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
