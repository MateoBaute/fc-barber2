import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body
        if(password == "admin123"){
            return NextResponse.json({
                success: true
            },
            {status: 200}
        )
        }else{
            return NextResponse.json({
                succes: false,
                message: "Contraseña incorrecta"
            },
            {status: 406}
        )
        }
    }catch(error){
        return NextResponse.json({
            success: false,
            message: error
        },
        {status: 500}
    )
    }
}