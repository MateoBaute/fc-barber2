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
                const { nombre, correo, numero, fecha, hora } = metadata;

                await db.query(
                    'INSERT INTO turnnos (nombre, correo, telefono, fecha, hora, paymentId) VALUES (?,?,?,?,?,?)'
                    , [nombre, correo, numero, fecha, hora, paymentId]);

                console.log(`¡Turno de ${nombre} guardado exitosamente en la BBDD!`);
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error) {
        console.error("Error procesando el webhook:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
