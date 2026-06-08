'use client';

import Link from 'next/link';

export default function PaymentSuccess() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-12 px-4">
            <div className="max-w-md w-full space-y-6 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-green-400 mb-2">
                    Pago Completado
                </h1>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-gray-300 text-lg">
                        Tu reserva ha sido confirmada exitosamente.
                    </p>
                    <p className="text-gray-400 text-sm">
                        Recibirás un correo de confirmación con los detalles de tu turno.
                    </p>
                </div>

                {/* Details Box */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black border border-green-500/30 rounded-xl p-6 text-left space-y-3">
                    <div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Estado</p>
                        <p className="text-green-400 font-semibold">Confirmado</p>
                    </div>
                    <div className="border-t border-green-500/20 pt-3">
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Próximos pasos</p>
                        <ul className="text-gray-300 text-sm space-y-2 mt-2">
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                <span>Revisa tu email para obtener la confirmación</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                <span>Llega 10 minutos antes a tu turno</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                <span>Si necesitas ayuda, contactanos</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                    <Link href="/" className="block w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-500 hover:to-green-600 transition duration-300 shadow-lg shadow-green-500/20">
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
