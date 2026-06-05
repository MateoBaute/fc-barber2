'use client';

import Link from "next/link";
import { useState } from "react";

export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b-2 border-yellow-500 shadow-lg shadow-yellow-500/20">
            <nav className="m-auto flex max-w-6xl justify-between items-center py-4 px-4 md:px-16">
                <Link href="/" className="cursor-pointer text-3xl font-bold text-yellow-500 hover:text-yellow-400 transition duration-300 animate-glow">
                    ✂️ FC Barber
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
                    </div>
                </div>
            )}
        </header>
    )
}
