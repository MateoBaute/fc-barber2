import FormReservas from "@/app/components/reservas/formReservas";

export default function Reservas(){
    return(
        <div className="w-full py-12">
            <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 animate-glow">
                        Reservar Turno
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Reserva tu turno en FC Barber de forma fácil y rápida. 
                        Completa el formulario y elige el horario que mejor se adapte a ti.
                    </p>
                </div>

                {/* Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/30 rounded-lg hover:border-yellow-500 transition duration-300">
                        <div className="text-4xl mb-3">⏰</div>
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Horarios</h3>
                        <p className="text-sm text-gray-300">Lun-Sab: 9:00 - 19:00<br />Dom: 10:00 - 14:00</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/30 rounded-lg hover:border-yellow-500 transition duration-300">
                        <div className="text-4xl mb-3">💳</div>
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Pago Seguro</h3>
                        <p className="text-sm text-gray-300">Mercado Pago<br />100% seguro y confiable</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/30 rounded-lg hover:border-yellow-500 transition duration-300">
                        <div className="text-4xl mb-3">✓</div>
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Confirmación</h3>
                        <p className="text-sm text-gray-300">Recibirás confirmación<br />por email en 24h</p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-gradient-to-br from-gray-900/50 to-black border border-yellow-500/30 rounded-2xl p-8 animate-fade-in">
                    <FormReservas />
                </div>

                {/* Steps */}
                <div className="space-y-4 animate-slide-up">
                    <h3 className="text-2xl font-bold text-yellow-400 text-center mb-8">Cómo reservar</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { numero: "1", titulo: "Completa tu información", desc: "Nombre, email y teléfono" },
                            { numero: "2", titulo: "Selecciona la fecha", desc: "Elige el día que prefieras" },
                            { numero: "3", titulo: "Elige horario", desc: "Horas disponibles se cargan automáticamente" },
                            { numero: "4", titulo: "Confirma y paga", desc: "Realiza el pago para asegurar tu turno" }
                        ].map((paso, index) => (
                            <div key={index} className="text-center space-y-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/50">
                                    {paso.numero}
                                </div>
                                <div>
                                    <p className="font-bold text-yellow-400">{paso.titulo}</p>
                                    <p className="text-sm text-gray-300">{paso.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}