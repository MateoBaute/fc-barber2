import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import db from "@/lib/db";

const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
if (!token) throw new Error("Falta MERCADOPAGO_ACCESS_TOKEN");

const client = new MercadoPagoConfig({ accessToken: token });

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (body.type === "payment") {
            const paymentId = body.data.id;

            const paymentClient = new Payment(client);
            const paymentInfo = await paymentClient.get({ id: paymentId });

            if (paymentInfo.status === "approved") {
                const metadata = paymentInfo.metadata;
                const { usuario_id, nombre, correo, numero, fecha, horario, servicio } = metadata;

                try {
                    await db.query(
                        "INSERT INTO turnos (usuario_id, nombre, correo, telefono, fecha, horario, servicio, payment_id, estado_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pagado')",
                        [usuario_id ?? null, nombre, correo, numero, fecha, horario, servicio, String(paymentId)]
                    );

                    console.log(`¡Turno de ${nombre} guardado exitosamente en la BBDD!`);
                } catch (dbError: any) {
                    if (dbError?.code === "ER_DUP_ENTRY") {
                        console.log(`Webhook duplicado o horario ya ocupado para payment ${paymentId}, se ignora.`);
                    } else {
                        throw dbError;
                    }
                }
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error) {
        console.error("Error procesando el webhook:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}