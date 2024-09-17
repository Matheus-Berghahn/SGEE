import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
