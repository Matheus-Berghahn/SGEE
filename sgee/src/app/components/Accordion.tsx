// src/app/components/Accordion.tsx
import { useState } from 'react';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem = ({ title, content, isOpen, onClick }: AccordionItemProps & { isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="bg-color1 text-color-txt-2 rounded-lg shadow-lg mb-4 overflow-hidden border-2 border-color1">
      <button
        className="w-full text-left px-8 py-4 text-xl font-semibold text-color-txt-1 bg-color2 flex justify-between items-center"
        onClick={onClick}
      >
        {title}
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-8 text-color2">
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: 'Segurança e Controle de Acesso',
      content: 'A segurança dos seus dados é essencial. O sistema oferece uma única conta de administrador, garantindo que apenas uma pessoa tenha controle total sobre as informações. Isso minimiza riscos de acessos não autorizados, mantendo seus dados protegidos e seguros.',
    },
    {
      title: 'Mudança de Usuário',
      content: 'Para alterar o e-mail ou a senha de acesso ao sistema, é necessário entrar em contato diretamente com nossa equipe. Isso garante a segurança e a integridade das informações da conta. Para iniciar o processo de mudança, envie um e-mail para suporte@empresa.com solicitando as alterações desejadas.',
    },
    {
      title: 'Suporte ao Usuário',
      content: 'Caso precise de assistência, nossa equipe está pronta para ajudar. Explore nossos recursos de suporte, que incluem guias detalhados e opções de contato direto. Se você encontrar qualquer dificuldade ou tiver dúvidas, não hesite em nos solicitar ajuda. Estamos aqui para garantir que sua experiência com o sistema seja a melhor possível.',
    },
  ];

  return (
    <div className="flex h-full justify-center flex-col ">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
