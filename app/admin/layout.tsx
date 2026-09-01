'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/turnos", label: "Turnos" },
    ];

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-16 mb-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-2">Panel Admin</h1>
                        <p className="text-text-secondary">Gestioná el barbershop</p>
                    </div>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-transparent border border-surface-border hover:bg-white/5 text-text-secondary rounded transition duration-300 text-sm font-medium"
                    >
                        Volver al Inicio
                    </Link>
                </div>

                <div className="flex gap-2 border-b border-surface-border">
                    {tabs.map((tab) => {
                        const activo = pathname === tab.href;
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition duration-300 ${
                                    activo
                                        ? 'border-accent text-accent'
                                        : 'border-transparent text-text-secondary hover:text-accent'
                                }`}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-16">
                {children}
            </div>
        </div>
    );
}