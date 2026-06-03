import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre, email, telefono, fecha, horario } = body;

        if (!nombre || !email || !telefono || !fecha || !horario) {
            return NextResponse.json({
                message: "Por favor, completa todos los campos para confirmar tu reserva.",
                success: false
            },
                { status: 400 });
        }
        console.log(nombre, email, telefono, fecha, horario)
        await db.query(
            "INSERT INTO turnos (nombre, correo, telefono, fecha, horario) VALUES (?, ?, ?, ?, ?)",
            [nombre, email, telefono, fecha, horario]
        );
        return NextResponse.json({
            message: "Turno confirmado exitosamente.",
            success: true
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Error al confirmar el turno." + error,
            success: false
        }, { status: 500 });
    }
}