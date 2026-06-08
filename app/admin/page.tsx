'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Descomentamos la interfaz para evitar errores de TypeScript (any)
interface Turno {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    fecha: string;
    horario: string; // Asegúrate de que coincida con tu base de datos (hora u horario)
}




export default function AdminPanel() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [cambio, setCambio] = useState(false)

    const [turnos, setTurnos] = useState<Turno[]>([]);

    async function adminTurnos() {
        try {
            const response = await fetch('/api/turnos', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }, 
            });
            const data = await response.json();

            if (data.success) {
                setTurnos(sortTurnos(data.turnos));
            }
        } catch (error) {
            console.error("Error al obtener turnos:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function sortTurnos(items: Turno[]) {
        const safeParse = (t: Turno) => {
            const dateParts = t.fecha ? String(t.fecha).split('-').map(Number) : [];
            const [y, m, d] = dateParts.length === 3 ? dateParts : [0, 0, 0];
            let hour = 0, minute = 0;
            if (t.horario) {
                const parts = String(t.horario).split(':').map(Number);
                hour = parts[0] ?? 0;
                minute = parts[1] ?? 0;
            }
            return Date.UTC(y, Math.max(0, m - 1), d || 1, hour || 0, minute || 0);
        };

        return [...items].sort((a, b) => safeParse(a) - safeParse(b));
    }

    useEffect(() => {
        adminTurnos();
    }, [cambio]);

    async function eliminarTurno(id:number) {
        try {
            const response = await fetch('/api/eliminarTurno', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id})
            })

            const data = await response.json()
            if (data.success) {
                alert('turno eliminado con éxito')
                setCambio(!cambio)
            }
        } catch (error) {
            console.log(error)
            alert('error al eliminar turno')
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
                <p className="text-yellow-400 text-xl">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-16 mb-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">Panel Admin</h1>
                        <p className="text-gray-400">Gestiona los turnos del barbershop</p>
                    </div>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition duration-300 text-sm font-medium"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-16">
                <div className="grid gap-4 mb-4">
                    <div className="hidden md:grid grid-cols-5 gap-4 bg-black border border-yellow-500/20 rounded-lg p-4 font-bold text-gray-400 text-sm">
                        <div>Nombre</div>
                        <div>Contacto</div>
                        <div>Fecha</div>
                        <div>Hora</div>
                        <div>Eliminar</div>
                    </div>
                </div>

                {turnos.length > 0 ? (
                    turnos.map((t) => (
                        <div
                            key={t.id}
                            className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white mb-2"
                        >
                            <div>{t.nombre}</div>
                            <div className="text-gray-400 text-sm">{t.telefono || t.correo}</div>
                            <div>{new Date(t.fecha).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                timeZone: 'UTC'
                            })}</div>
                            <div className="text-yellow-500">{t.horario}</div>
                            <div>
                                <button onClick={() => eliminarTurno(t.id)}  aria-label={`Eliminar turno ${t.id}`}
                                    className="px-3 py-1 bg-transparent hover:bg-red-600/10 text-red-500 hover:text-red-600 border border-transparent hover:border-red-600 rounded text-sm font-medium transition-colors duration-150"
                                > Eliminar turno</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 bg-zinc-900 rounded-lg border border-zinc-800">
                        <p className="text-gray-400">No hay turnos registrados</p>
                    </div>
                )}
            </div>
        </div>
    );
}
