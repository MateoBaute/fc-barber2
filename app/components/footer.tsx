'use client';

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-20 border-t-2 border-yellow-500/30 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-6xl mx-auto px-4 md:px-16 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Branding */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-yellow-500">✂️ FC Barber</h3>
                        <p className="text-gray-400 text-sm">
                            Tu barbería de confianza. Donde la tradición y la excelencia se encuentran.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: "f", href: "#", label: "Facebook" },
                                { icon: "𝕏", href: "#", label: "Twitter" },
                                { icon: "📷", href: "#", label: "Instagram" }
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="text-gray-400 hover:text-yellow-500 transition duration-300 text-lg"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-yellow-400">Enlaces Rápidos</h4>
                        <nav className="space-y-2 flex flex-col">
                            <Link href="/" className="text-gray-400 hover:text-yellow-500 transition duration-300 text-sm">
                                Inicio
                            </Link>
                            <Link href="/servicios" className="text-gray-400 hover:text-yellow-500 transition duration-300 text-sm">
                                Servicios
                            </Link>
                            <Link href="/contacto" className="text-gray-400 hover:text-yellow-500 transition duration-300 text-sm">
                                Contacto
                            </Link>
                            <Link href="/reservas" className="text-gray-400 hover:text-yellow-500 transition duration-300 text-sm">
                                Reservar
                            </Link>
                        </nav>
                    </div>

                    {/* Servicios */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-yellow-400">Servicios</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>✓ Corte de Cabello</p>
                            <p>✓ Corte de Barba</p>
                            <p>✓ Afeitado Tradicional</p>
                            <p>✓ Consulta de Estilo</p>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-yellow-400">Contacto</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>Calle Principal 123</p>
                            <p>+598 2 1234 5678</p>
                            <p>info@fcbarber.com</p>
                            <p>Lun-Sab: 9:00-19:00</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-yellow-500/20 pt-8 text-center text-gray-500 text-sm space-y-2">
                    <p>© {currentYear} FC Barber. Todos los derechos reservados.</p>
                    <p className="text-xs">
                        Hecho con ❤️ | 
                        <Link href="#" className="text-yellow-500 hover:text-yellow-400 mx-1">Privacidad</Link>
                        | 
                        <Link href="#" className="text-yellow-500 hover:text-yellow-400 mx-1">Términos</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
