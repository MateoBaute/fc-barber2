import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { crearSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { correo, password } = body;

        if (!correo || !password) {
            return NextResponse.json({
                success: false,
                message: "Completa correo y contraseña."
            }, { status: 400 });
        }

        const [rows] = await db.query(
            "SELECT id, nombre, correo, contrasena_hash, rol FROM usuarios WHERE correo = ?",
            [correo]
        );

        const usuarios = rows as any[];
        if (usuarios.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Correo o contraseña incorrectos."
            }, { status: 401 });
        }

        const usuario = usuarios[0];
        const passwordValida = await bcrypt.compare(password, usuario.contrasena_hash);

        if (!passwordValida) {
            return NextResponse.json({
                success: false,
                message: "Correo o contraseña incorrectos."
            }, { status: 401 });
        }

        const token = await crearSessionToken({
            userId: usuario.id,
            correo: usuario.correo,
            nombre: usuario.nombre,
            rol: usuario.rol
        });

        const response = NextResponse.json({
            success: true,
            usuario: {
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        }, { status: 200 });

        response.cookies.set(SESSION_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return response;

    } catch (error) {
        console.error("Error en /api/auth/login:", error);
        return NextResponse.json({
            success: false,
            message: "Error al iniciar sesión."
        }, { status: 500 });
    }
}