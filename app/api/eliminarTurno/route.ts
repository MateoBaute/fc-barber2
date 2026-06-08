import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function DELETE(request: Request){
    try{
        const body = await request.json();
        const { id } = body

         await db.query('DELETE from turnos where id = ?',[id])

         return NextResponse.json(
            {success:true},
            {status: 200}
         )
    }catch(err){
        return NextResponse.json(
            {error: 'Error al eliminar turno: ', err},
            {status: 500}
        )
    }
}