'use client';

import Link from 'next/link';

export default function PaymentPending() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-12 px-4">
            <div className="max-w-md w-full space-y-6 text-center">
                {/* Pending Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">
                    Pago en Proceso
                </h1>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-gray-300 text-lg">
                        Tu pago está siendo procesado.
                    </p>
                    <p className="text-gray-400 text-sm">
                        Te notificaremos cuando se confirme. Por favor, no cierres esta página.
                    </p>
                </div>

                {/* Details Box */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black border border-yellow-500/30 rounded-xl p-6 text-left space-y-3">
                    <div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Estado</p>
                        <p className="text-yellow-400 font-semibold">En espera de confirmación</p>
                    </div>
                    <div className="border-t border-yellow-500/20 pt-3">
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Información importante</p>
                        <ul className="text-gray-300 text-sm space-y-2 mt-2">
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">•</span>
                                <span>Confirmaremos tu pago en breve</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">•</span>
                                <span>Recibirás un email con el resultado</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">•</span>
                                <span>No realices otro pago</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                    <Link href="/" className="block w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition duration-300 shadow-lg shadow-yellow-500/20">
                        Volver al inicio
                    </Link>
                    <Link href="/contacto" className="block w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition duration-300 border border-gray-600">
                        Contactar soporte
                    </Link>
                </div>
            </div>
        </div>
    );
}
