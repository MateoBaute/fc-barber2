import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verificarSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ success: false, usuario: null }, { status: 200 });
    }

    const payload = await verificarSessionToken(token);

    if (!payload) {
        return NextResponse.json({ success: false, usuario: null }, { status: 200 });
    }

    return NextResponse.json({
        success: true,
        usuario: {
            nombre: payload.nombre,
            correo: payload.correo,
            rol: payload.rol
        }
    }, { status: 200 });
}