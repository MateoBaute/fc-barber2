'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Verificar si hay sesión de admin guardada
        const adminSession = localStorage.getItem("adminLoggedIn");
        if (adminSession === "true") {
            setIsAdminLoggedIn(true);
        }
    }, []);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password})
        })
        const data = await response.json()
        if (data.success) {
            setIsAdminLoggedIn(true);
            localStorage.setItem("adminLoggedIn", "true");
            setShowLoginModal(false);
            setPassword("");
            setError("");
        } else {
            setError("Contraseña incorrecta");
            setPassword("");
        }
    };

    const handleAdminLogout = () => {
        setIsAdminLoggedIn(false);
        localStorage.removeItem("adminLoggedIn");
    };

    return(
        <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b-2 border-yellow-500 shadow-lg shadow-yellow-500/20">
            <nav className="m-auto flex max-w-6xl justify-between items-center py-4 px-4 md:px-16">
                <Link href="/" className="cursor-pointer text-3xl font-bold text-yellow-500 hover:text-yellow-400 transition duration-300 animate-glow">
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
                            className="text-gray-300 hover:text-yellow-400 transition duration-300 relative group text-sm font-medium"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {isAdminLoggedIn ? (
                        <>
                            <Link 
                                href="/admin" 
                                className="text-gray-300 hover:text-yellow-400 transition duration-300 text-sm font-medium"
                            >
                                Panel Admin
                            </Link>
                            <button 
                                onClick={handleAdminLogout}
                                className="px-3 py-1 text-sm bg-red-600/80 hover:bg-red-500 text-white rounded transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setShowLoginModal(true)}
                            className="px-3 py-1 text-sm bg-yellow-600/80 hover:bg-yellow-500 text-black rounded font-medium transition duration-300"
                        >
                            Admin
                        </button>
                    )}
                </div>

                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-yellow-500 text-2xl hover:text-yellow-400 transition"
                >
                    ☰
                </button>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden bg-black/95 border-t border-yellow-500/30 animate-slide-down">
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
                                className="text-gray-300 hover:text-yellow-400 transition duration-300 text-lg font-medium w-full"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="border-t border-yellow-500/30 pt-4 w-full">
                            {isAdminLoggedIn ? (
                                <>
                                    <Link 
                                        href="/admin" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-yellow-400 hover:text-yellow-300 transition duration-300 text-lg font-medium w-full block mb-3"
                                    >
                                        Panel Admin
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            handleAdminLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-sm bg-red-600/80 hover:bg-red-500 text-white rounded transition duration-300 font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => {
                                        setShowLoginModal(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full px-3 py-2 text-sm bg-yellow-600/80 hover:bg-yellow-500 text-black rounded font-medium transition duration-300"
                                >
                                    Admin
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Login */}
            {showLoginModal && (
                <div className="fixed inset-0 top-60 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-black border-2 border-yellow-500 rounded-lg p-8 max-w-md w-full animate-slide-up">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Login Admin</h2>
                        
                        <form onSubmit={handleAdminLogin} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Contraseña
                                </label>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa la contraseña"
                                    className="w-full px-4 py-2 bg-gray-900 border border-yellow-500/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm font-medium">{error}</p>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded font-medium transition duration-300"
                                >
                                    Entrar
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setShowLoginModal(false);
                                        setPassword("");
                                        setError("");
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium transition duration-300"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    )
}
