import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

function getSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing environment variable: JWT_SECRET");
    }
    return new TextEncoder().encode(secret);
}

export interface SessionPayload {
    userId: number;
    correo: string;
    nombre: string;
    rol: "cliente" | "admin";
}

export async function crearSessionToken(payload: SessionPayload): Promise<string> {
    return await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getSecret());
}

export async function verificarSessionToken(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret());
        return payload as unknown as SessionPayload;
    } catch {
        return null;
    }
}

export async function obtenerUsuarioSesion(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verificarSessionToken(token);
}

export const SESSION_COOKIE_NAME = "fc_session";