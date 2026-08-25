'use client'

import { useState, useEffect } from 'react';
import CustomDatePicker from '../CustomDatePicker';

type MetodoPago = 'online' | 'local';

export default function FormReservas() {
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [fecha, setFecha] = useState<string>('');
    const [horario, setHorario] = useState<string>('');
    const [horasDisponibles, setHorariosDisponibles] = useState<string[]>([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [metodoPago, setMetodoPago] = useState<MetodoPago>('online');
    const [reservaConfirmada, setReservaConfirmada] = useState(false);

    const horarios: string[] = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
    ];

    useEffect(() => {
        if (!fecha) return;

        async function obtenerHorarios() {
            const fechaFormateada = formatearFecha(fecha);
            try {
                const response = await fetch("/api/turnosDisponibles", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fecha: fechaFormateada })
                });
                const data = await response.json();
                if (data.success) {
                    const horarios_disponibles = horarios.filter(h => !data.horariosOcupados.includes(h));
                    setHorariosDisponibles(horarios_disponibles);
                }
            } catch (error) {
                console.error("Error al obtener los horarios disponibles: ", error);
            }
        }

        obtenerHorarios();
    }, [fecha]);

    useEffect(() => {
        setFechaSeleccionada(true);
        setHorario('');
    }, [horasDisponibles]);

    function formatearFecha(fechaString: string): string {
        const fechaObj = new Date(fechaString + 'T00:00:00');
        const año = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const día = String(fechaObj.getDate()).padStart(2, '0');
        return `${año}-${mes}-${día}`;
    }

    function resetFormulario() {
        setNombre('');
        setEmail('');
        setTelefono('');
        setFecha('');
        setHorario('');
        setHorariosDisponibles([]);
        setFechaSeleccionada(false);
        setMetodoPago('online');
    }

    async function confirmarTurno() {
        if (!nombre || !email || !telefono || !fecha || !horario) {
            alert("Por favor, completa todos los campos para confirmar tu reserva.");
            return;
        }

        setLoading(true);
        const fechaFormateada = formatearFecha(fecha);

        try {
            if (metodoPago === 'online') {
                const response = await fetch('/api/pagarReserva', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: nombre, email: email, numero: telefono, fecha: fechaFormateada, horario: horario })
                });

                const data = await response.json();
                if (data.success) {
                    if (data.initPoint) {
                        window.location.href = data.initPoint;
                    } else {
                        alert('Reserva exitosa');
                    }
                } else {
                    alert(data.message || 'Error al confirmar la reserva.');
                }
            } else {
                const response = await fetch('/api/ingresarTurno', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: nombre, email: email, telefono: telefono, fecha: fechaFormateada, horario: horario })
                });

                const data = await response.json();
                if (data.success) {
                    setReservaConfirmada(true);
                    resetFormulario();
                } else {
                    alert(data.message || 'Error al confirmar la reserva.');
                }
            }
        } catch (error) {
            console.error(error);
            alert('Error al confirmar la reserva.');
        } finally {
            setLoading(false);
        }
    }

    if (reservaConfirmada) {
        return (
            <div className="w-full p-8 bg-surface border border-accent rounded-xl text-center space-y-4 animate-slide-up">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent text-accent-text-on flex items-center justify-center text-3xl font-bold">
                    ✓
                </div>
                <h3 className="text-2xl font-bold text-accent">¡Turno reservado!</h3>
                <p className="text-text-secondary">
                    Tu turno quedó agendado. Recordá que el pago lo hacés en el local el día de tu cita.
                </p>
                <button
                    onClick={() => setReservaConfirmada(false)}
                    className="px-6 py-2 bg-accent text-accent-text-on rounded-lg font-medium hover:bg-accent-strong transition duration-300"
                >
                    Hacer otra reserva
                </button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8">
            {/* Paso 1: Información Personal */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-text-on font-bold flex items-center justify-center">
                        1
                    </div>
                    <h3 className="text-2xl font-bold text-accent">Tu Información</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surface border border-surface-border rounded-xl">
                    <div className="relative group">
                        <label className="block text-accent font-semibold mb-3 text-sm uppercase tracking-wider">Nombre Completo</label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            placeholder="Ingrese sun nombre"
                            className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg text-text-secondary placeholder-text-muted focus:border-accent focus:bg-surface outline-none transition duration-300 hover:border-accent"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-focus-within:w-full transition-all duration-300 rounded-full"></div>
                    </div>

                    <div className="relative group">
                        <label className="block text-accent font-semibold mb-3 text-sm uppercase tracking-wider">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Ingrese su email"
                            className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg text-text-secondary placeholder-text-muted focus:border-accent focus:bg-surface outline-none transition duration-300 hover:border-accent"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-focus-within:w-full transition-all duration-300 rounded-full"></div>
                    </div>

                    <div className="relative group">
                        <label className="block text-accent font-semibold mb-3 text-sm uppercase tracking-wider">Teléfono</label>
                        <input
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            type="tel"
                            placeholder="Número de teléfono"
                            className="w-full px-4 py-3 bg-background border border-surface-border rounded-lg text-text-secondary placeholder-text-muted focus:border-accent focus:bg-surface outline-none transition duration-300 hover:border-accent"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-focus-within:w-full transition-all duration-300 rounded-full"></div>
                    </div>

                    <div className="relative group">
                        <CustomDatePicker
                            value={fecha}
                            onChange={(date) => setFecha(date)}
                            label="Fecha"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-focus-within:w-full transition-all duration-300 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Paso 2: Seleccionar Horario */}
            {fechaSeleccionada && (
                <div className="space-y-6 animate-slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-text-on font-bold flex items-center justify-center">
                            2
                        </div>
                        <h3 className="text-2xl font-bold text-accent">Elige tu Horario</h3>
                    </div>

                    {horasDisponibles.length > 0 ? (
                        <div className="p-6 bg-surface border border-surface-border rounded-xl space-y-4">
                            <p className="text-text-secondary text-sm">Horarios disponibles</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {horasDisponibles.map((h, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setHorario(h)}
                                        className={`py-3 px-2 rounded-lg font-semibold transition duration-300 transform hover:scale-110 relative overflow-hidden group ${
                                            horario === h
                                                ? 'bg-accent text-accent-text-on scale-105'
                                                : 'bg-background border border-surface-border text-text-secondary hover:border-accent hover:bg-white/5'
                                        }`}
                                    >
                                        {h}
                                        {horario === h && (
                                            <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 bg-surface border border-surface-border rounded-xl text-center space-y-3 animate-fade-in">
                            <p className="font-bold text-accent text-lg">No hay horarios disponibles</p>
                            <p className="text-text-secondary text-sm">Para la fecha seleccionada, por favor elige otra fecha.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Paso 3: Método de pago */}
            {nombre && email && telefono && fecha && horario && (
                <div className="space-y-6 animate-slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-text-on font-bold flex items-center justify-center">
                            3
                        </div>
                        <h3 className="text-2xl font-bold text-accent">¿Cómo querés pagar?</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setMetodoPago('online')}
                            className={`p-6 rounded-xl border text-left transition duration-300 ${
                                metodoPago === 'online'
                                    ? 'border-accent bg-surface'
                                    : 'border-surface-border bg-surface hover:border-accent/50'
                            }`}
                        >
                            <p className="text-accent font-bold text-lg mb-1">Pagar ahora</p>
                            <p className="text-text-secondary text-sm">Con MercadoPago, tarjeta o dinero en cuenta.</p>
                        </button>

                        <button
                            type="button"
                            onClick={() => setMetodoPago('local')}
                            className={`p-6 rounded-xl border text-left transition duration-300 ${
                                metodoPago === 'local'
                                    ? 'border-accent bg-surface'
                                    : 'border-surface-border bg-surface hover:border-accent/50'
                            }`}
                        >
                            <p className="text-accent font-bold text-lg mb-1">Pagar en el local</p>
                            <p className="text-text-secondary text-sm">Reservás ahora, pagás el día de tu turno.</p>
                        </button>
                    </div>
                </div>
            )}

            {/* Paso 4: Resumen de reserva */}
            {nombre && email && telefono && fecha && horario && (
                <div className="space-y-6 animate-slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-text-on font-bold flex items-center justify-center">
                            4
                        </div>
                        <h3 className="text-2xl font-bold text-accent">Resumen de tu Reserva</h3>
                    </div>

                    <div className="p-6 bg-surface border border-accent rounded-xl space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="text-accent text-sm uppercase tracking-widest font-semibold">Nombre</p>
                                <p className="text-gray-200 text-lg font-bold">{nombre}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-accent text-sm uppercase tracking-widest font-semibold">Email</p>
                                <p className="text-gray-200 text-lg font-bold break-all">{email}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-accent text-sm uppercase tracking-widest font-semibold">Teléfono</p>
                                <p className="text-gray-200 text-lg font-bold">{telefono}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-accent text-sm uppercase tracking-widest font-semibold">Fecha</p>
                                <p className="text-gray-200 text-lg font-bold">{fecha}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-accent text-sm uppercase tracking-widest font-semibold">Horario</p>
                                <p className="text-gray-200 text-lg font-bold">{horario} hs</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-accent text-sm uppercase tracking-widest font-semibold">Monto</p>
                                <p className="text-accent text-lg font-bold">
                                    $300 {metodoPago === 'local' ? '(en el local)' : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Botón de confirmación */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-text-on font-bold flex items-center justify-center">
                        5
                    </div>
                    <h3 className="text-2xl font-bold text-accent">
                        {metodoPago === 'online' ? 'Confirmar y Pagar' : 'Confirmar Reserva'}
                    </h3>
                </div>

                <button
                    onClick={confirmarTurno}
                    disabled={loading || !nombre || !email || !telefono || !fecha || !horario}
                    className="w-full group relative overflow-hidden py-4 px-6 bg-accent text-accent-text-on font-bold text-lg rounded-xl hover:bg-accent-strong disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                        {loading ? (
                            <span className="inline-block">Procesando...</span>
                        ) : metodoPago === 'online' ? (
                            <span>Confirmar Reserva - $300</span>
                        ) : (
                            <span>Confirmar Reserva - Pago en local</span>
                        )}
                    </div>
                    {!loading && (
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    )}
                </button>

                {/* Nota de seguridad */}
                {metodoPago === 'online' ? (
                    <div className="p-6 bg-surface border border-surface-border rounded-xl space-y-3 text-center">
                        <h3 className="text-lg font-bold text-accent">Reserva Segura</h3>
                        <p className="text-accent-strong font-semibold">Pago 100% Seguro</p>
                        <p className="text-text-secondary text-sm">Tu información está protegida</p>
                        <p className="text-text-muted text-xs">El pago se procesa a través de Mercado Pago</p>
                    </div>
                ) : (
                    <div className="p-6 bg-surface border border-surface-border rounded-xl space-y-3 text-center">
                        <h3 className="text-lg font-bold text-accent">Pagás cuando llegás</h3>
                        <p className="text-text-secondary text-sm">Tu turno queda reservado igual. Solo abonás en el local.</p>
                    </div>
                )}
            </div>
        </div>
    );
}