import { NextResponse } from "next/server";
import db from "@/lib/db";

export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fecha } = body;

        if (!fecha || typeof fecha !== 'string') {
            return NextResponse.json({
                success: false,
                message: 'Falta la fecha en la petición.'
            }, { status: 400 });
        }

        const [rows] = await db.query(
            "SELECT horario FROM turnos WHERE fecha = ?",
            [fecha]
        );

        const horariosOcupados = Array.isArray(rows)
            ? rows.map((row: any) => row.horario)
            : [];

        return NextResponse.json({
            horariosOcupados,
            success: true
        }, { status: 200 });
    } catch (error) {
        console.error('Error en /api/turnosDisponibles:', error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Error interno del servidor.'
        }, { status: 500 });
    }
}