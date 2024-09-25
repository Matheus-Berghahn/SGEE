'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Slider from 'react-slick';
import Accordion from './components/Accordion';

const Home = () => {
  // Defina o estado inicial como 0 para manter o primeiro accordion ativo
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const items = [
    {
      title: "Dicas para Uso Eficiente",
      content: "Descubra estratégias e dicas para otimizar o uso do sistema e melhorar sua eficiência. Desde atalhos de teclado até personalizações avançadas, essas orientações ajudarão você a tirar o máximo proveito das funcionalidades disponíveis."
    },
    {
      title: "Mudança de Usuário",
      content: "Para alterar o e-mail ou a senha de acesso ao sistema, é necessário entrar em contato diretamente com nossa equipe. Isso garante a segurança e a integridade das informações da conta. Para iniciar o processo de mudança, envie um e-mail para suporte@empresa.com solicitando as alterações desejadas"
    },
    {
      title: "Suporte e Contato",
      content: "Precisa de ajuda? Confira as opções de suporte disponíveis, incluindo tutoriais e fóruns de discussão. Entre em contato com nossa equipe de suporte para resolver qualquer dúvida ou problema que você possa ter com o sistema."
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className='w-[20%] h-full'></div>
      <div className="flex-grow justify-start pt-[5%] p-8 bg-color2 relative w-[67%] flex flex-col">
        {/* Círculo decorativo */}
        <svg
          className="absolute top-0 right-0 w-full h-full"
          viewBox="0 0 1024 968"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="400" r="400"  className="fill-color5" fillOpacity=".1"  />
        </svg>

        {/* Título no topo */}
        <h1 className="text-5xl md:text-5xl font-bold text-color-txt-1 text-center mb-12 md:mb-16 drop-shadow-xl ">
          Sistema de Gestão de Equipamentos de Escritório
        </h1>

        {/* Primeira linha de cards */}
        <div className="flex flex-wrap gap-8 mb-8 ">
          <div  className="card bg-color2 bg-opacity-90 rounded-lg p-8 shadow-lg shadow-color2opacity10 text-center flex-1 w-full md:w-1/3 border-2 border-color1 ">
            <h2 className="text-xl md:text-2xl font-semibold text-color-txt-1 mb-4">Cadastro Simplificado</h2>
            <p className="text-color-txt-4 text-[14px] ">
            Gerencie seus equipamentos de forma rápida e eficiente. Com um processo de cadastro intuitivo, você pode adicionar novos itens com detalhes como nome, tipo e descrição. A interface é projetada para facilitar a inclusão e a organização, garantindo que cada equipamento esteja registrado e pronto para uso sem complicações
            </p>
          </div>

          <div className="card bg-color2 bg-opacity-90 rounded-lg p-8 shadow-lg shadow-color2opacity10 text-center flex-1 w-full md:w-1/3 border-2 border-color1  ">
            <h2 className="text-xl md:text-2xl font-semibold text-color-txt-1 mb-4">Monitoramento Instantâneo</h2>
            <p className="text-color-txt-4 text-[14px] ">
            Receba atualizações em tempo real sobre a localização e uso dos seus equipamentos. Monitore o status de cada item e visualize relatórios detalhados para uma gestão eficiente e segura.
            </p>
          </div>

          <div className="card bg-color2 bg-opacity-90 rounded-lg p-8 shadow-lg shadow-color2opacity10 text-center flex-1 w-full md:w-1/3 border-2 border-color1  ">
            <h2 className="text-xl md:text-2xl font-semibold text-color-txt-1 mb-4">Facilidade de Uso</h2>
            <p className="text-color-txt-4 text-[14px] ">
            Explore a facilidade de uso do sistema com uma interface amigável e práticas funcionalidades. Navegue com facilidade entre diferentes seções, aproveite a busca eficiente e os filtros intuitivos para localizar rapidamente qualquer equipamento ou usuário. A experiência foi otimizada para garantir que você possa gerenciar tudo sem esforço.
            </p>
          </div>
        </div>

        {/* Segunda linha de cards */}
        <div className="flex h-full gap-8 w-full ">
          <div className=' card2 md:w-1/2 '>
            {/* Passe o activeIndex e toggleAccordion para o componente Accordion */}
            <Accordion activeIndex={activeIndex} toggleAccordion={toggleAccordion} items={items} />
          </div>

          {/* Slider Card */}
          <div className="card3 bg-color2 rounded-lg p-8 shadow-lg shadow-color2opacity10 text-center flex-1 justify-center items-center w-full md:w-1/2 border-2 border-color1">
            <h2 className="text-3xl font-bold text-color-txt-1 mb-6">Ajuda com o Sistema</h2>
            <Slider {...sliderSettings}>
              <div className="bg-color1  rounded-lg px-6 py-10 shadow-lg  mb-5 ">
                <h3 className="text-xl font-semibold text-color-txt-2 mb-4">Personalização do Sistema</h3>
                <p className="text-color-txt-2 opacity-60 text-justify">
                Se você tiver questões sobre como ajustar as configurações do seu perfil ou personalizar o tema do sistema, estamos aqui para ajudar. Envie suas perguntas por e-mail para SGEE@gmail.com.br, e nossa equipe fornecerá orientações detalhadas para garantir que você aproveite ao máximo as opções de personalização disponíveis.
                </p>
              </div>
              <div className="bg-color1  rounded-lg p-6 shadow-lg  mb-5">
                <h3 className="text-xl font-semibold text-color-txt-2 mb-4">Gerenciamento de Equipamentos</h3>
                <p className="text-color-txt-2 opacity-60">
                Quer saber mais sobre como cadastrar, editar ou monitorar equipamentos? Caso tenha dúvidas sobre essas funcionalidades, entre em contato com nossa equipe. Envie um e-mail detalhando sua dúvida para SGEE@gmail.com.br, e retornaremos com as informações necessárias para ajudar você a utilizar o sistema da melhor forma possível.
                </p>
              </div>
              <div className="bg-color1  rounded-lg p-6 shadow-lg  mb-5">
                <h3 className="text-xl font-semibold text-color-txt-2 mb-4">Gerenciamento de Usuários</h3>
                <p className="text-color-txt-2 opacity-60">
                Precisa de ajuda para adicionar ou editar usuários no sistema? Se tiver dúvidas sobre como gerenciar as informações dos usuários, envie um e-mail para SGEE@gmail.com.br. Nossa equipe está pronta para fornecer o suporte necessário e garantir que o processo de gerenciamento de usuários seja simples e eficiente para você.
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
