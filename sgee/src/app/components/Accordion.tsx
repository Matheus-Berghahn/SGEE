// src/app/components/Accordion.tsx
import { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem = ({ title, content, isOpen, onClick }: AccordionItemProps & { isOpen: boolean; onClick: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null); // Referência ao conteúdo
  const [contentHeight, setContentHeight] = useState(0);

  // Atualize a altura quando o conteúdo mudar
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const animationProps = useSpring({
    height: isOpen ? `${contentHeight}px` : '0px',
    opacity: isOpen ? 1 : 0,
    overflow: 'hidden',
  });

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
      <animated.div style={animationProps}>
        <div ref={contentRef} className="p-8 text-color-txt-2">
          {content}
        </div>
      </animated.div>
    </div>
  );
};

interface AccordionProps {
  activeIndex: number | null;
  toggleAccordion: (index: number) => void;
  items: AccordionItemProps[];
}

const Accordion: React.FC<AccordionProps> = ({ activeIndex, toggleAccordion, items }) => {
  if (!items || items.length === 0) {
    return <p className="text-center text-color-txt-1">No items available</p>;
  }

  return (
    <div className="flex h-full justify-center flex-col">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={activeIndex === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
