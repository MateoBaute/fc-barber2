import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre, correo, telefono, password } = body;

        if (!nombre || !correo || !password) {
            return NextResponse.json({
                success: false,
                message: "Completa nombre, correo y contraseña."
            }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                message: "La contraseña debe tener al menos 6 caracteres."
            }, { status: 400 });
        }

        const [existentes] = await db.query(
            "SELECT id FROM usuarios WHERE correo = ?",
            [correo]
        );

        if (Array.isArray(existentes) && existentes.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Ya existe una cuenta con ese correo."
            }, { status: 409 });
        }

        const contrasenaHash = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO usuarios (nombre, correo, telefono, contrasena_hash, rol) VALUES (?, ?, ?, ?, 'cliente')",
            [nombre, correo, telefono ?? null, contrasenaHash]
        );

        return NextResponse.json({
            success: true,
            message: "Cuenta creada correctamente."
        }, { status: 201 });

    } catch (error) {
        console.error("Error en /api/auth/register:", error);
        return NextResponse.json({
            success: false,
            message: "Error al crear la cuenta."
        }, { status: 500 });
    }
}