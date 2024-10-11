'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getTotalEquipamentos, getEquipamentosEmUso, getTotalUsuarios, getEquipamentosPorTipo } from './action'; // Atualize o caminho conforme necessário

const Dashboard = () => {
  const [totalEquipamentos, setTotalEquipamentos] = useState(0);
  const [equipamentosEmUso, setEquipamentosEmUso] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  const [notebooks, setNotebooks] = useState(0);
  const [impressoras, setImpressoras] = useState(0);
  const [monitores, setMonitores] = useState(0);
  const [cadeiras, setCadeiras] = useState(0);
  const [webcams, setWebcams] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const totalEquip = await getTotalEquipamentos();
      const equipEmUso = await getEquipamentosEmUso();
      const totalUsers = await getTotalUsuarios();
      const equipamentosPorTipo = await getEquipamentosPorTipo();

      setTotalEquipamentos(totalEquip);
      setEquipamentosEmUso(equipEmUso);
      setTotalUsuarios(totalUsers);


      equipamentosPorTipo.forEach((equipamento) => {
        if (equipamento.tipo === 'NOTEBOOK') setNotebooks(equipamento._count.tipo);
        if (equipamento.tipo === 'IMPRESSORA') setImpressoras(equipamento._count.tipo);
        if (equipamento.tipo === 'MONITOR') setMonitores(equipamento._count.tipo);
        if (equipamento.tipo === 'CADEIRA') setCadeiras(equipamento._count.tipo);
        if (equipamento.tipo === 'WEBCAM') setWebcams(equipamento._count.tipo);
      });
    }

    fetchData();
  }, []);

  console.log(notebooks)

  return (
    <>
    
    
    <div className="flex justify-center items-center w-full h-full bg-color1 py-10">
      <Sidebar />
      <div className='md:w-[20%] h-full'></div>
      <div className="flex flex-col  md:flex-1 md:p-6">
        {/* Modais de Resumo */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 w-full items-center justify-center">
          <div className="card w-[70%] md:w-1/4 bg-color4 rounded-lg p-10 md:p-16 relative shadow-xl  border-2 border-color1">
            <p className="text-4xl md:text-7xl font-bold text-center text-color-txt-1">{totalEquipamentos}</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-1">Total de Equipamentos</p>
          </div>
          <div className="card w-[70%] md:w-1/4 bg-color4 rounded-lg p-10 md:p-16 shadow-xl  relative border-2 border-color1">
            <p className="text-4xl md:text-7xl font-bold text-center text-color-txt-1">{equipamentosEmUso}</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-1">Equipamentos Sendo Usados</p>
          </div>
          <div className="card w-[70%] md:w-2/4 bg-color2 rounded-lg p-10 md:p-16 shadow-xl  relative border-2 border-color1">
            <p className="text-3xl md:text-7xl font-bold text-center text-color-txt-2">11/10/2024</p>
            <p className="absolute left-5 bottom-5 text-center text-color-txt-2">Última Atualização do Sistema</p>
          </div>
        </div>

        {/* Modais de Detalhe */}
        <div className="bg-color4 rounded-lg p-6 shadow-lg  mb-6 border-2 border-color1">
          <div className="flex flex-col md:flex-row items-center justify-center  gap-6">
            <div className="card flex-1 text-center border-2 border-color2 w-[70%] md:w-1/5 rounded-lg bg-color2">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Notebooks</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">{notebooks}</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-[70%] md:w-1/5 rounded-lg bg-color2">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Impressoras</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">{impressoras}</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-[70%] md:w-1/5 rounded-lg bg-color2">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Monitores</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">{monitores}</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-[70%] md:w-1/5 rounded-lg bg-color2">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Cadeiras</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">{cadeiras}</p>
            </div>
            <div className="card flex-1 text-center border-2 border-color2 w-[70%] md:w-1/5 rounded-lg bg-color2">
              <p className="text-2xl py-5 font-bold text-color-txt-2">Webcams</p>
              <p className="text-5xl pb-5 font-bold text-color-txt-2">{webcams}</p>
            </div>
          </div>
        </div>

        {/* Informações de Usuários */}
        <div className="card bg-color1 border-2 border-color4 rounded-lg p-6 shadow-lg  flex h-[370px]">
          <div className="w-full md:w-1/2 text-center flex justify-between flex-col">
            <p className="text-4xl font-bold text-color-txt-3">Total de Usuários</p>
            <p className="text-[180px] font-bold text-color-txt-3">{totalUsuarios}</p>
          </div>
          <div className="w-1/2 hidden md:visible">
            <img src="/img_faces.jpg" alt="Imagem de Usuários" className="w-full h-full object-cover rounded-lg border-2 border-color1 grayscale" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
