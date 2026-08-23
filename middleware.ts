import { NextRequest, NextResponse } from "next/server";
import { verificarSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const payload = token ? await verificarSessionToken(token) : null;

    if (!payload || payload.rol !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/((?!login).*)"]
};