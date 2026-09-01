'use client';

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-20 border-t border-surface-border bg-surface">
            <div className="max-w-6xl mx-auto px-4 md:px-16 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Branding */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-accent">Barber</h3>
                        <p className="text-text-secondary text-sm">
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
                                    className="text-text-secondary hover:text-accent transition duration-300 text-lg"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-accent">Enlaces Rápidos</h4>
                        <nav className="space-y-2 flex flex-col">
                            <Link href="/" className="text-text-secondary hover:text-accent transition duration-300 text-sm">
                                Inicio
                            </Link>
                            <Link href="/servicios" className="text-text-secondary hover:text-accent transition duration-300 text-sm">
                                Servicios
                            </Link>
                            <Link href="/contacto" className="text-text-secondary hover:text-accent transition duration-300 text-sm">
                                Contacto
                            </Link>
                            <Link href="/reservas" className="text-text-secondary hover:text-accent transition duration-300 text-sm">
                                Reservar
                            </Link>
                        </nav>
                    </div>

                    {/* Servicios */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-accent">Servicios</h4>
                        <div className="space-y-2 text-sm text-text-secondary">
                            <p>✓ Corte de Cabello</p>
                            <p>✓ Corte de Barba</p>
                            <p>✓ Afeitado Tradicional</p>
                            <p>✓ Consulta de Estilo</p>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-accent">Contacto</h4>
                        <div className="space-y-2 text-sm text-text-secondary">
                            <p>📍 Calle Principal 123</p>
                            <p>📞 +598 2 1234 5678</p>
                            <p>✉️ info@barber.com</p>
                            <p>⏰ Lun-Sab: 9:00-19:00</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-surface-border pt-8 text-center text-text-muted text-sm space-y-2">
                    <p>© {currentYear} Barber. Todos los derechos reservados.</p>
                    <p className="text-xs">
                        Hecho por Mateo Baute | 
                        <Link href="#" className="text-accent hover:text-accent-strong mx-1">Privacidad</Link>
                        | 
                        <Link href="#" className="text-accent hover:text-accent-strong mx-1">Términos</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
