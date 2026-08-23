'use client';

import Link from 'next/link';

export default function PaymentSuccess() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background py-12 px-4">
            <div className="max-w-md w-full space-y-6 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-accent/15 border border-accent rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-accent mb-2">
                    Pago Completado
                </h1>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-text-secondary text-lg">
                        Tu reserva ha sido confirmada exitosamente.
                    </p>
                    <p className="text-text-muted text-sm">
                        Recibirás un correo de confirmación con los detalles de tu turno.
                    </p>
                </div>

                {/* Details Box */}
                <div className="bg-surface border border-surface-border rounded-xl p-6 text-left space-y-3">
                    <div>
                        <p className="text-text-muted text-sm uppercase tracking-wider">Estado</p>
                        <p className="text-accent font-semibold">Confirmado</p>
                    </div>
                    <div className="border-t border-surface-border pt-3">
                        <p className="text-text-muted text-sm uppercase tracking-wider">Próximos pasos</p>
                        <ul className="text-text-secondary text-sm space-y-2 mt-2">
                            <li className="flex items-start">
                                <span className="text-accent mr-2">•</span>
                                <span>Revisa tu email para obtener la confirmación</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-2">•</span>
                                <span>Llega 10 minutos antes a tu turno</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-2">•</span>
                                <span>Si necesitas ayuda, contactanos</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                    <Link href="/" className="block w-full py-3 bg-accent text-accent-text-on font-bold rounded-lg hover:bg-accent-strong transition duration-300">
                        Volver al inicio
                    </Link>
                    <Link href="/contacto" className="block w-full py-3 bg-transparent text-text-secondary font-bold rounded-lg hover:bg-white/5 transition duration-300 border border-surface-border">
                        Contactar soporte
                    </Link>
                </div>
            </div>
        </div>
    );
}
