import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
    try {
        const [rows] = await db.query('select * from turnos')
        return NextResponse.json(
            {
                success: true,
                turnos: rows 
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error en GET /api/turnos:", error) 
        
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
