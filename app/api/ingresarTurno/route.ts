import { NextResponse } from "next/server";
import db from "@/lib/db";
import { obtenerUsuarioSesion } from "@/lib/auth";
import { servicios } from "@/lib/servicios";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre, email, telefono, fecha, horario, servicio } = body;

        if (!nombre || !email || !telefono || !fecha || !horario || !servicio) {
            return NextResponse.json({
                message: "Por favor, completa todos los campos para confirmar tu reserva.",
                success: false
            }, { status: 400 });
        }

        const servicioObj = servicios.find(s => s.slug === servicio);
        if (!servicioObj) {
            return NextResponse.json({
                message: "El servicio seleccionado no es válido.",
                success: false
            }, { status: 400 });
        }

        const usuario = await obtenerUsuarioSesion();

        await db.query(
            "INSERT INTO turnos (usuario_id, nombre, correo, telefono, fecha, horario, servicio, estado_pago) VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente')",
            [usuario?.userId ?? null, nombre, email, telefono, fecha, horario, servicioObj.nombre]
        );

        return NextResponse.json({
            message: "Turno confirmado exitosamente.",
            success: true
        }, { status: 200 });

    } catch (error: any) {
        if (error?.code === "ER_DUP_ENTRY") {
            return NextResponse.json({
                message: "Ese horario ya fue reservado por otra persona. Elegí otro.",
                success: false
            }, { status: 409 });
        }

        console.error("Error en /api/ingresarTurno:", error);
        return NextResponse.json({
            message: "Error al confirmar el turno.",
            success: false
        }, { status: 500 });
    }
}