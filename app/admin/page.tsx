'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

interface Turno {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    fecha: string;
    horario: string;
    servicio: string;
    estado_pago: 'pendiente' | 'pagado';
}




export default function AdminPanel() {
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

    async function eliminarTurno(id: number) {
        try {
            const response = await fetch('/api/eliminarTurno', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
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
            <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
                <p className="text-accent text-xl">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-16 mb-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-2">Panel Admin</h1>
                        <p className="text-gray-400">Gestiona los turnos del barbershop</p>
                    </div>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-transparent border border-surface-border hover:bg-white/5 text-text-secondary rounded transition duration-300 text-sm font-medium"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-16">
                <div className="grid gap-4 mb-4">
                    <div className="hidden md:grid grid-cols-6 gap-4 bg-surface border border-surface-border rounded-lg p-4 font-bold text-text-muted text-sm">
                        <div>Nombre</div>
                        <div>Contacto</div>
                        <div>Fecha</div>
                        <div>Hora</div>
                        <div>Pago</div>
                        <div>Eliminar</div>
                    </div>
                </div>

                {turnos.length > 0 ? (
                    turnos.map((t) => (
                        <div key={t.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-surface border border-surface-border rounded-lg p-4 text-foreground mb-2">
                            <div>
                                {t.nombre}
                                <p className="text-text-muted text-xs font-normal">{t.servicio}</p>
                            </div>
                            <div className="text-text-muted text-sm">{t.telefono || t.correo}</div>
                            <div>{new Date(t.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' })}</div>
                            <div className="text-accent">{t.horario}</div>
                            <div>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${t.estado_pago === 'pagado'
                                    ? 'bg-accent/20 text-accent'
                                    : 'bg-text-muted/20 text-text-muted'
                                    }`}>
                                    {t.estado_pago === 'pagado' ? 'Pagado' : 'En el local'}
                                </span>
                            </div>
                            <div>
                                <button onClick={() => eliminarTurno(t.id)} aria-label={`Eliminar turno ${t.id}`}
                                    className="px-3 py-1 bg-transparent hover:bg-danger/10 text-danger hover:border-danger border border-transparent rounded text-sm font-medium transition-colors duration-150"
                                > Eliminar turno</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 bg-surface rounded-lg border border-surface-border">
                        <p className="text-text-muted">No hay turnos registrados</p>
                    </div>
                )}
            </div>
        </div>
    );
}
