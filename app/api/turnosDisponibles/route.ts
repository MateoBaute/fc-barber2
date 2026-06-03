import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const { fecha } = body;

        if (!fecha) {
            return NextResponse.json({
                success: false,
                message: 'Falta la fecha en la petición.'
            }, { status: 400 });
        }

        const [rows] = await db.query(
            "SELECT horario FROM turnos WHERE fecha = ?",
            [fecha]
        );

        const horariosOcupados = Array.isArray(rows)
            ? rows.map((row: any) => row.horario)
            : [];

        return NextResponse.json({
            horariosOcupados,
            success: true
        }, { status: 200 });
    }catch(error){
        return NextResponse.json({
            success: false
        }, { status: 500 });
    }
}