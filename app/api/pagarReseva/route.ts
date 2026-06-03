import { NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, fecha, horario } = body

        const preference = new Preference(client)

        const result = await preference.create({
            body: {
                items: [
                    {
                        id:`reserva-${fecha}-${horario}`,
                        title: `Reserva de turno: ${fecha} a las ${horario}hs`,
                        quantity: 1,
                        unit_price: 300,
                        currency_id: "URU",
                    },
                ],
                payer: {
                    name:name,
                    email: email,
                },
                back_urls: {
                    success:"",
                    failure: "",
                    pending:"",
                },
                auto_return: "approved"
            },
        });

        return NextResponse.json({
            initPoint: result.init_point
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error al confirmar el turno." + error,
            success: false
        }, { status: 500 });
    }
}