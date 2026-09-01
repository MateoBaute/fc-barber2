import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { obtenerUsuarioSesion } from '@/lib/auth'

export async function DELETE(request: Request) {
    const sesion = await obtenerUsuarioSesion();
    if (!sesion || sesion.rol !== 'admin') {
        return NextResponse.json(
            { error: "No autorizado." },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const { id } = body

        await db.query('DELETE from turnos where id = ?', [id])

        return NextResponse.json(
            { success: true },
            { status: 200 }
        )
    } catch (err) {
        return NextResponse.json(
            { error: 'Error al eliminar turno: ', err },
            { status: 500 }
        )
    }
}