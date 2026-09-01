'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Usuario {
    nombre: string;
    correo: string;
    rol: 'cliente' | 'admin';
}

function PersonIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    );
}

function CheckBadgeIcon() {
    return (
        <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    );
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.usuario) {
                    setUsuario(data.usuario);
                }
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setAccountMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUsuario(null);
        setAccountMenuOpen(false);
        router.push("/");
        router.refresh();
    };

    return (
        <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-surface/95 border-b border-surface-border">
            <nav className="m-auto flex max-w-6xl justify-between items-center py-4 px-4 md:px-16">
                <Link href="/" className="cursor-pointer text-3xl font-bold text-accent hover:text-accent-strong transition duration-300">
                    Barber
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {[
                        { href: "/", label: "Inicio" },
                        { href: "/servicios", label: "Servicios" },
                        { href: "/contacto", label: "Contacto" },
                        { href: "/reservas", label: "Reservar" }
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-text-secondary hover:text-accent transition duration-300 relative group text-sm font-medium"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center">
                    {usuario ? (
                        <div className="relative" ref={accountMenuRef}>
                            <button
                                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded text-text-secondary hover:text-accent hover:bg-white/5 transition duration-300 text-sm font-medium"
                            >
                                <PersonIcon />
                                <span>{usuario.nombre}</span>
                                {usuario.rol === 'admin' && <CheckBadgeIcon />}
                            </button>

                            {accountMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-surface border border-surface-border rounded-lg shadow-xl shadow-black/20 py-2 z-50 animate-slide-up">
                                    <Link
                                        href="/perfil"
                                        onClick={() => setAccountMenuOpen(false)}
                                        className="block px-4 py-2 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition"
                                    >
                                        Perfil
                                    </Link>
                                    {usuario.rol === 'admin' && (
                                        <Link
                                            href="/admin"
                                            onClick={() => setAccountMenuOpen(false)}
                                            className="block px-4 py-2 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition"
                                        >
                                            Panel Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-accent transition duration-300 font-medium"
                        >
                            <PersonIcon />
                            <span>Ingresar</span>
                        </Link>
                    )}
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-accent text-2xl hover:text-accent-strong transition"
                >
                    ☰
                </button>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden bg-surface border-t border-surface-border animate-slide-down">
                    <div className="flex flex-col items-start space-y-4 p-6">
                        {[
                            { href: "/", label: "Inicio" },
                            { href: "/servicios", label: "Servicios" },
                            { href: "/contacto", label: "Contacto" },
                            { href: "/reservas", label: "Reservar" }
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-text-secondary hover:text-accent transition duration-300 text-lg font-medium w-full"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="border-t border-surface-border pt-4 w-full space-y-3">
                            {usuario ? (
                                <>
                                    <div className="flex items-center gap-2 text-accent text-lg font-medium">
                                        <PersonIcon />
                                        <span>{usuario.nombre}</span>
                                        {usuario.rol === 'admin' && <CheckBadgeIcon />}
                                    </div>
                                    <Link
                                        href="/perfil"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-text-secondary hover:text-accent transition duration-300 text-sm font-medium w-full block"
                                    >
                                        Perfil
                                    </Link>
                                    {usuario.rol === 'admin' && (
                                        <Link
                                            href="/admin"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-text-secondary hover:text-accent transition duration-300 text-sm font-medium w-full block"
                                        >
                                            Panel Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-sm bg-danger/90 hover:bg-danger text-white rounded transition duration-300 font-medium"
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full px-3 py-2 text-sm bg-accent hover:bg-accent-strong text-accent-text-on rounded font-medium transition duration-300 flex items-center justify-center gap-2"
                                >
                                    <PersonIcon />
                                    <span>Ingresar</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}