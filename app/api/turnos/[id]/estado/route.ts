import { NextResponse } from "next/server";
import db from "@/lib/db";
import { obtenerUsuarioSesion } from "@/lib/auth";

const ESTADOS_VALIDOS = ['pendiente', 'completado', 'cancelado'];

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const sesion = await obtenerUsuarioSesion();
    if (!sesion || sesion.rol !== 'admin') {
        return NextResponse.json(
            { success: false, message: "No autorizado." },
            { status: 403 }
        );
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { estado } = body;

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return NextResponse.json(
                { success: false, message: "Estado inválido." },
                { status: 400 }
            );
        }

        await db.query("UPDATE turnos SET estado = ? WHERE id = ?", [estado, id]);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Error en PATCH /api/turnos/[id]/estado:", error);
        return NextResponse.json(
            { success: false, message: "Error al actualizar el turno." },
            { status: 500 }
        );
    }
}