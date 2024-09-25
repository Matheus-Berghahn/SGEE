'use client';

import Image from 'next/image';
import { FaUser, FaLock } from 'react-icons/fa';
import { getAdm } from './action';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function verificationLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Limpa a mensagem de erro ao tentar fazer login
      setError('');
      const adm = await getAdm(email, password);
      router.push('/');
    } catch (error) {
      // Define a mensagem de erro
      setError('Email ou senha incorretos. Por favor, tente novamente.');
      console.log(error);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-color5 to-color3">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 1024 768" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="400" fill="#000000" fillOpacity="0.03" />
        </svg>
      </div>
      <div className="relative w-full max-w-sm p-6 bg-color2 rounded-md shadow-2xl shadow-color2opacity10">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <h1 className="mb-6 text-2xl font-semibold text-center text-color-txt-1">Login</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 border border-red-300 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={verificationLogin}>
          <div className="mb-4">
            <div className="flex items-center border border-coloshadow-color-txt-1 rounded-md">
              <FaUser className="w-5 h-5 ml-3 text-coloshadow-color-txt-1" />
              <input
                type='text'
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-coloshadow-color-txt-1 bg-color2 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border border-coloshadow-color-txt-1 rounded-md">
              <FaLock className="w-5 h-5 ml-3 text-coloshadow-color-txt-1" />
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-coloshadow-color-txt-1 bg-color2 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-coloshadow-color-txt-1 transition duration-200 border border-coloshadow-color-txt-1 rounded-md bg-color2 hover:bg-gray-100"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
