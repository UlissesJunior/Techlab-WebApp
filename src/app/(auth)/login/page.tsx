'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DialogInput from '@/components/UI/DialogInput';
import DialogButton from '@/components/UI/DialogButton';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated]);

  //ERRO DO ULTIMO COMMIT
  //-------------------------
  // useEffect(() => {
  //   const token = authController.getValidToken();
  //   if (token) {
  //     apiService.setToken(token);
  //     router.push("/dashboard");
  //   }
  // }, []);
  //-------------------------

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await login(email, password);
    if (token) {
      router.push('/dashboard');
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Faça o login em sua conta</h2>
      <form className="space-y-6 sm:space-y-8" onSubmit={handleLogin}>
        <DialogInput
          label="Endereço de email"
          type="email"
          className="border border-border"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DialogInput
          label="Senha"
          type="password"
          className="border border-border"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DialogButton
          type="submit"
          className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          Entrar
        </DialogButton>
      </form>
      <p className="text-xs sm:text-sm text-center mt-4">
        Não tem uma conta?{' '}
        <Link href="/signup" className="text-[#4F46E5] font-semibold">Registre-se</Link>
      </p>
    </div>
  );
}