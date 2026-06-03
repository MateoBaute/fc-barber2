'use client'

import { useState, useEffect } from 'react';

export default function FormReservas() {
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [fecha, setFecha] = useState<string>('');
    const [horario, setHorario] = useState<string>('');
    const [horasDisponibles, setHorariosDisponibles] = useState<string[]>([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState<boolean>(false)

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
                    console.log('Primeras horas:', data.horariosOcupados)
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
        setFechaSeleccionada(true)
        console.log(horasDisponibles)

    }, [horasDisponibles])

    function formatearFecha(fechaString: string): string {
        const fechaObj = new Date(fechaString + 'T00:00:00');
        const año = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const día = String(fechaObj.getDate()).padStart(2, '0');
        return `${año}-${mes}-${día}`;
    }

    async function confirmarTurno() {
        if (!nombre || !email || !telefono || !fecha || !horario) {
            alert("Por favor, completa todos los campos para confirmar tu reserva.");
            return;
        }
        const fechaFormateada = formatearFecha(fecha);
        try {
            const response = await fetch('/api/pagarReserva', {
                method: "POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify({ name: nombre, email: email, fecha: fechaFormateada, horario: horario })
            });

            const data = await response.json()
            if(data.success){
                alert('Reserva exitosa')
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-w-3xl mx-auto bg-slate-700 p-6 rounded-lg shadow-md">
            <div className="grid gap-4 md:grid-cols-4">
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre completo" className="mb-4 p-2 max-w-60 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo electrónico" className="mb-4 p-2 max-w-60 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="tel" placeholder="Número de teléfono" className="mb-4 p-2 max-w-60 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                {/* Cambiado para manejar solo el cambio de estado */}
                <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" className="mb-4 p-2 max-w-60 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                {fechaSeleccionada ? (horasDisponibles.map((h, index) => (
                    <button key={index} onClick={() => setHorario(h)} className={`mb-4 p-2 max-w-60 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${horario === h ? 'bg-yellow-400 text-white' : 'bg-white text-gray-800'}`}>
                        {h}
                    </button>

                ))) : null}

            </div>
            <div className='w-full px-4 item-center m-auto'>
                <button onClick={confirmarTurno} className="mb-4 mx-auto p-2 max-w-60 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-400 text-white">
                    Confirmar Reserva
                </button>
            </div>
        </div>
    );
}
