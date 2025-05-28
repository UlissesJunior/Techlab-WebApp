'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DialogInput from '@/components/UI/DialogInput';
import DialogButton from '@/components/UI/DialogButton';
import Link from 'next/link';
import { userController } from '@/controllers/UserController';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await userController.createUser({ name, email, password });

    if (user) {
      router.push('/login');
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Registre-se em nossa plataforma</h2>
      <form className="space-y-6 sm:space-y-8" onSubmit={handleSignup}>
        <DialogInput
          label="Nome"
          type="text"
          className='border border-border'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DialogInput
          label="Endereço de email"
          type="email"
          className='border border-border'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DialogInput
          label="Senha"
          type="password"
          className='border border-border'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DialogButton
          type="submit"
          className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          Registrar-se
        </DialogButton>
      </form>
      <p className="text-xs sm:text-sm text-center mt-4">
        Já tem uma conta?{' '}
        <Link href="/login" className="text-[#4F46E5] font-semibold">Entre</Link>
      </p>
    </div>
  );
}