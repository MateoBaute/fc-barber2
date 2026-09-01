import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { obtenerUsuarioSesion } from '@/lib/auth'

export async function GET(request: Request) {
    const sesion = await obtenerUsuarioSesion();
    if (!sesion || sesion.rol !== 'admin') {
        return NextResponse.json(
            { success: false, error: "No autorizado." },
            { status: 403 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const estado = searchParams.get('estado');

        let query = 'SELECT * FROM turnos';
        const queryParams: any[] = [];

        if (estado) {
            query += ' WHERE estado = ?';
            queryParams.push(estado);
        }

        const [rows] = await db.query(query, queryParams);

        return NextResponse.json(
            { success: true, turnos: rows },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error en GET /api/turnos:", error)
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        )
    }
}