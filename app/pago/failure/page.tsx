'use client';

import Link from 'next/link';

export default function PaymentFailure() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background py-12 px-4">
            <div className="max-w-md w-full space-y-6 text-center">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-danger/15 border border-danger rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-danger mb-2">
                    Pago No Completado
                </h1>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-text-secondary text-lg">
                        Lo sentimos, tu pago no pudo ser procesado.
                    </p>
                    <p className="text-text-muted text-sm">
                        Por favor, verifica tu información de pago e intenta nuevamente.
                    </p>
                </div>

                {/* Details Box */}
                <div className="bg-surface border border-surface-border rounded-xl p-6 text-left space-y-3">
                    <div>
                        <p className="text-text-muted text-sm uppercase tracking-wider">Estado</p>
                        <p className="text-danger font-semibold">No completado</p>
                    </div>
                    <div className="border-t border-surface-border pt-3">
                        <p className="text-text-muted text-sm uppercase tracking-wider">Qué puedes hacer</p>
                        <ul className="text-text-secondary text-sm space-y-2 mt-2">
                            <li className="flex items-start">
                                <span className="text-danger mr-2">•</span>
                                <span>Verifica los datos de tu tarjeta</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-danger mr-2">•</span>
                                <span>Intenta con otro método de pago</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-danger mr-2">•</span>
                                <span>Contacta a tu banco si persiste el error</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                    <Link href="/reservas" className="block w-full py-3 bg-danger text-white font-bold rounded-lg hover:bg-danger/80 transition duration-300">
                        Intentar nuevamente
                    </Link>
                    <Link href="/contacto" className="block w-full py-3 bg-transparent text-text-secondary font-bold rounded-lg hover:bg-white/5 transition duration-300 border border-surface-border">
                        Contactar soporte
                    </Link>
                </div>
            </div>
        </div>
    );
}
