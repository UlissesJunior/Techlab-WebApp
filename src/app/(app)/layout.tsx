import React from 'react';
import { Navbar } from '@/components/Layout/Navbar/Navbar';
import OperationsButton from '@/components/UI/OperationsButton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="p-6 md:p-8 lg:p-10 xl:p-12 bg-background min-h-screen text-white">
                {children}
            </main>
            <OperationsButton />
        </>
    );
}