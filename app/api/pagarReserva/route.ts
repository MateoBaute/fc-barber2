import { NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago";
import { obtenerUsuarioSesion } from "@/lib/auth";
import { servicios } from "@/lib/servicios";

export const runtime = 'nodejs';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, numero, fecha, horario, servicio } = body

        const servicioObj = servicios.find(s => s.slug === servicio);
        if (!servicioObj) {
            return NextResponse.json({
                message: "El servicio seleccionado no es válido.",
                success: false
            }, { status: 400 });
        }

        const usuario = await obtenerUsuarioSesion();

        const preference = new Preference(client)

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: `reserva-${fecha}-${horario}`,
                        title: `${servicioObj.nombre} — ${fecha} a las ${horario}hs`,
                        quantity: 1,
                        unit_price: servicioObj.precio,
                        currency_id: "UYU",
                    },
                ],

                payer: {
                    name: name,
                    email: email,
                },
                metadata: {
                    usuario_id: usuario?.userId ?? null,
                    nombre: name,
                    correo: email,
                    numero: numero,
                    fecha: fecha,
                    horario: horario,
                    servicio: servicioObj.nombre,
                    precio: servicioObj.precio,
                },
                back_urls: {
                    success: "https://repo-barber.vercel.app/pago/success",
                    failure: "https://repo-barber.vercel.app/pago/failure",
                    pending: "https://repo-barber.vercel.app/pago/pending",
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