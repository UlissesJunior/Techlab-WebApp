'use client';

import DialogInput from '@/components/UI/DialogInput';
import DialogButton from '@/components/UI/DialogButton';
import Link from 'next/link';

export default function SignupPage() {
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Registre-se em nossa plataforma</h2>
      <form className="space-y-6 sm:space-y-8" onSubmit={handleSignup}>
        <DialogInput label="Nome" type="text" className='border border-border' required />
        <DialogInput label="Endereço de email" type="email" className='border border-border' required />
        <DialogInput label="Senha" type="password" className='border border-border' required />
        <DialogButton type="submit" className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer">Registrar-se</DialogButton>
      </form>
      <p className="text-xs sm:text-sm text-center mt-4">
        Já tem uma conta?{' '}
        <Link href="/login" className="text-[#4F46E5] font-semibold">Entre</Link>
      </p>
    </div>
  );
}
