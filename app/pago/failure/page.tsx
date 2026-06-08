'use client';

import Link from 'next/link';

export default function PaymentFailure() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-12 px-4">
            <div className="max-w-md w-full space-y-6 text-center">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-red-400 mb-2">
                    Pago No Completado
                </h1>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-gray-300 text-lg">
                        Lo sentimos, tu pago no pudo ser procesado.
                    </p>
                    <p className="text-gray-400 text-sm">
                        Por favor, verifica tu información de pago e intenta nuevamente.
                    </p>
                </div>

                {/* Details Box */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-500/30 rounded-xl p-6 text-left space-y-3">
                    <div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Estado</p>
                        <p className="text-red-400 font-semibold">No completado</p>
                    </div>
                    <div className="border-t border-red-500/20 pt-3">
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Qué puedes hacer</p>
                        <ul className="text-gray-300 text-sm space-y-2 mt-2">
                            <li className="flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                <span>Verifica los datos de tu tarjeta</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                <span>Intenta con otro método de pago</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                <span>Contacta a tu banco si persiste el error</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                    <Link href="/reservas" className="block w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-500 hover:to-red-600 transition duration-300 shadow-lg shadow-red-500/20">
                        Intentar nuevamente
                    </Link>
                    <Link href="/contacto" className="block w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition duration-300 border border-gray-600">
                        Contactar soporte
                    </Link>
                </div>
            </div>
        </div>
    );
}
