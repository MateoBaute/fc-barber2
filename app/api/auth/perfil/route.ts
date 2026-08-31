import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { obtenerUsuarioSesion, crearSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
    const sesion = await obtenerUsuarioSesion();
    if (!sesion) {
        return NextResponse.json({ success: false, message: "No autenticado." }, { status: 401 });
    }

    const [rows] = await db.query(
        "SELECT nombre, correo, telefono, rol, created_at FROM usuarios WHERE id = ?",
        [sesion.userId]
    );
    const usuarios = rows as any[];

    if (usuarios.length === 0) {
        return NextResponse.json({ success: false, message: "Usuario no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ success: true, usuario: usuarios[0] }, { status: 200 });
}

export async function PUT(request: Request) {
    const sesion = await obtenerUsuarioSesion();
    if (!sesion) {
        return NextResponse.json({ success: false, message: "No autenticado." }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { nombre, correo, telefono, passwordActual, passwordNueva } = body;

        if (!nombre || !correo) {
            return NextResponse.json({
                success: false,
                message: "Nombre y correo son obligatorios."
            }, { status: 400 });
        }

        const [existentes] = await db.query(
            "SELECT id FROM usuarios WHERE correo = ? AND id != ?",
            [correo, sesion.userId]
        );
        if (Array.isArray(existentes) && existentes.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Ese correo ya está en uso por otra cuenta."
            }, { status: 409 });
        }

        const params: any[] = [nombre, correo, telefono ?? null];
        let setPassword = "";

        if (passwordNueva) {
            if (!passwordActual) {
                return NextResponse.json({
                    success: false,
                    message: "Ingresá tu contraseña actual para cambiarla."
                }, { status: 400 });
            }
            if (passwordNueva.length < 6) {
                return NextResponse.json({
                    success: false,
                    message: "La nueva contraseña debe tener al menos 6 caracteres."
                }, { status: 400 });
            }

            const [rows] = await db.query(
                "SELECT contrasena_hash FROM usuarios WHERE id = ?",
                [sesion.userId]
            );
            const actual = (rows as any[])[0];
            const passwordValida = await bcrypt.compare(passwordActual, actual.contrasena_hash);

            if (!passwordValida) {
                return NextResponse.json({
                    success: false,
                    message: "La contraseña actual es incorrecta."
                }, { status: 401 });
            }

            const nuevoHash = await bcrypt.hash(passwordNueva, 10);
            setPassword = ", contrasena_hash = ?";
            params.push(nuevoHash);
        }

        params.push(sesion.userId);

        await db.query(
            `UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?${setPassword} WHERE id = ?`,
            params
        );

        const nuevoToken = await crearSessionToken({
            userId: sesion.userId,
            correo,
            nombre,
            rol: sesion.rol
        });

        const response = NextResponse.json({
            success: true,
            message: "Perfil actualizado correctamente."
        }, { status: 200 });

        response.cookies.set(SESSION_COOKIE_NAME, nuevoToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return response;

    } catch (error) {
        console.error("Error en PUT /api/auth/perfil:", error);
        return NextResponse.json({
            success: false,
            message: "Error al actualizar el perfil."
        }, { status: 500 });
    }
}