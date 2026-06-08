import { NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago";

export const runtime = 'nodejs';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, numero, fecha, horario } = body

        const preference = new Preference(client)

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: `reserva-${fecha}-${horario}`,
                        title: `Reserva de turno: ${fecha} a las ${horario}hs`,
                        quantity: 1,
                        unit_price: 300,
                        currency_id: "UYU",
                    },
                ],

                payer: {
                    name: name,
                    email: email,
                },
                // Nota: Escribe las propiedades en minúsculas por compatibilidad con el Webhook
                metadata: {
                    nombre: name,
                    correo: email,
                    numero: numero, // Asegúrate de recibir la variable 'numero' en tu función
                    fecha: fecha,
                    hora: horario,
                },
                back_urls: {
                    success: "https://fc-barber.vercel.app/pago/success",
                    failure: "https://fc-barber.vercel.app/pago/failure",
                    pending: "https://fc-barber.vercel.app/pago/pending",
                },
                auto_return: "approved"
            },
        });

        return NextResponse.json({
            success: true,
            initPoint: result.init_point
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error al confirmar el turno." + error,
            success: false
        }, { status: 500 });
    }
}