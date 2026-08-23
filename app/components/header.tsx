'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.usuario?.rol === 'admin') {
                    setIsAdminLoggedIn(true);
                }
            })
            .catch(() => {});
    }, []);

    const handleAdminLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setIsAdminLoggedIn(false);
        router.push("/");
        router.refresh();
    };

    return (
        <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-surface/95 border-b border-surface-border">
            <nav className="m-auto flex max-w-6xl justify-between items-center py-4 px-4 md:px-16">
                <Link href="/" className="cursor-pointer text-3xl font-bold text-accent hover:text-accent-strong transition duration-300">
                    FC Barber
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

                <div className="hidden md:flex items-center space-x-4">
                    {isAdminLoggedIn ? (
                        <>
                            <Link
                                href="/admin"
                                className="text-text-secondary hover:text-accent transition duration-300 text-sm font-medium"
                            >
                                Panel Admin
                            </Link>
                            <button
                                onClick={handleAdminLogout}
                                className="px-3 py-1 text-sm bg-danger/90 hover:bg-danger text-white rounded transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/admin/login"
                            className="px-3 py-1 text-sm bg-accent hover:bg-accent-strong text-accent-text-on rounded font-medium transition duration-300"
                        >
                            Admin
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
                        <div className="border-t border-surface-border pt-4 w-full">
                            {isAdminLoggedIn ? (
                                <>
                                    <Link
                                        href="/admin"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-accent hover:text-accent-strong transition duration-300 text-lg font-medium w-full block mb-3"
                                    >
                                        Panel Admin
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleAdminLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-sm bg-danger/90 hover:bg-danger text-white rounded transition duration-300 font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/admin/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full px-3 py-2 text-sm bg-accent hover:bg-accent-strong text-accent-text-on rounded font-medium transition duration-300 block text-center"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}