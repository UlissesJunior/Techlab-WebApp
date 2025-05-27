import React from 'react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex text-foreground">
      <div className="hidden md:flex w-1/2 bg-[#4F46E5] items-center justify-center">
        <div className="relative w-2/3 h-2/3 flex items-center justify-center">
          <Image
            src="/AuthSplashLogo.png"
            alt="Auth Illustration"
            width={512}
            height={512}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xs sm:max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}